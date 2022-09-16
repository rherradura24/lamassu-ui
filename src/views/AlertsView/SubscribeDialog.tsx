import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import { CloudEvent } from "cloudevents";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WebhookOutlinedIcon from "@mui/icons-material/WebhookOutlined";
import { useKeycloak } from "@react-keycloak/web";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json"; // need this
import * as styles from "./style.module.css";

interface Props {
    event: CloudEvent | undefined,
    isOpen: boolean,
    onClose: any
}
export const SubscribeDialog : React.FC<Props> = ({ event, isOpen, onClose }) => {
    const theme = useTheme();
    const [subscriptions, setSubscriptions] = useState<Array<any>>([]);

    const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<string>("email");
    const [selectedSubscriptionConfig, setSelectedSubscriptionConfig] = useState<any>({ name: "email" });

    const [conditions, setConditions] = useState<Array<any>>([]);
    const [regex, setRegex] = useState<string>("");

    const regexPlaceholder = {
        data: {
            name: "regex"
        }
    };

    useEffect(() => {
        setSelectedSubscriptionConfig({
            name: selectedSubscriptionType
        });
    }, [selectedSubscriptionType]);

    useEffect(() => {
        setSelectedSubscriptionConfig({
            name: selectedSubscriptionType
        });
    }, [subscriptions]);

    return (
        <Dialog open={isOpen} onClose={() => onClose()} maxWidth={"md"}>
            {
                event && (
                    <>
                        <DialogTitle>Subscribe to event: {event.type}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Add a new notification channel to receive the event.
                            </DialogContentText>
                            <Grid container style={{ marginTop: "10px" }} spacing={2} rowGap={4}>
                                <Grid item xs={12} container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel>Subscription Type</InputLabel>
                                            <Select
                                                value={selectedSubscriptionType}
                                                onChange={(select) => setSelectedSubscriptionType(select.target.value)}
                                            >
                                                <MenuItem value="email">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs="auto">
                                                            <EmailOutlinedIcon />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Typography>Email Notification</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </MenuItem>
                                                <MenuItem value="msteams">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs="auto">
                                                            <img src={process.env.PUBLIC_URL + "assets/msteams.png"} height="20px"/>
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Typography>Microsoft Teams Webhook</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </MenuItem>
                                                <MenuItem value="webhook">
                                                    <Grid container spacing={2}>
                                                        <Grid item xs="auto">
                                                            <WebhookOutlinedIcon />
                                                        </Grid>
                                                        <Grid item xs>
                                                            <Typography>Webhook</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    {
                                        selectedSubscriptionType === "email" && (
                                            <Grid item xs={12}>
                                                <TextField label="Email Address" disabled variant="standard" fullWidth value={useKeycloak().keycloak.profile?.email}/>
                                            </Grid>
                                        )
                                    }
                                    {
                                        selectedSubscriptionType === "msteams" && (
                                            <>
                                                <Grid item xs={12}>
                                                    <TextField label="Name" variant="standard" fullWidth value={selectedSubscriptionConfig.name} onChange={(ev) => setSelectedSubscriptionConfig((prev:any) => { return { ...prev, name: ev.target.value }; })}/>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField label="Incoming Microsoft Teams Webhook URL" variant="standard" fullWidth value={selectedSubscriptionConfig.webookurl} onChange={(ev) => setSelectedSubscriptionConfig((prev:any) => { return { ...prev, webookurl: ev.target.value }; })}/>
                                                </Grid>
                                            </>
                                        )
                                    }
                                    {
                                        selectedSubscriptionType === "webhook" && (
                                            <>
                                                <Grid item xs={12}>
                                                    <TextField label="Name" variant="standard" fullWidth value={selectedSubscriptionConfig.name} onChange={(ev) => setSelectedSubscriptionConfig((prev:any) => { return { ...prev, name: ev.target.value }; })}/>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel>Method</InputLabel>
                                                        <Select
                                                            value={selectedSubscriptionConfig.method}
                                                            onChange={(ev) => setSelectedSubscriptionConfig((prev:any) => { return { ...prev, method: ev.target.value }; })}
                                                        >
                                                            <MenuItem value="email">POST</MenuItem>
                                                            <MenuItem value="email">PUT</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField label="Webhook URL" variant="standard" fullWidth value={selectedSubscriptionConfig.webookurl} onChange={(ev) => setSelectedSubscriptionConfig((prev:any) => { return { ...prev, webookurl: ev.target.value }; })}/>
                                                </Grid>
                                            </>
                                        )
                                    }
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" onClick={() => {
                                            const subs = subscriptions.filter(s => s.config.name !== selectedSubscriptionConfig.name);
                                            setSubscriptions([...subs, {
                                                type: selectedSubscriptionType,
                                                config: selectedSubscriptionConfig
                                            }]);
                                        }} >
                                            Add Subscription
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container spacing={2}>
                                    <Grid item xs={12}>
                                        <DialogContentText>
                                            Subscriptions
                                        </DialogContentText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction="row" spacing={1}>
                                            {
                                                subscriptions.map((subscription, index) => {
                                                    let icon = <></>;
                                                    if (subscription.type === "email") {
                                                        icon = <EmailOutlinedIcon />;
                                                    } else if (subscription.type === "msteams") {
                                                        icon = <img src={process.env.PUBLIC_URL + "assets/msteams.png"} height="18px"/>;
                                                    } else if (subscription.type === "webhook") {
                                                        icon = <WebhookOutlinedIcon />;
                                                    }

                                                    return (
                                                        <Chip key={index} icon={icon} label={subscription.config.name} onDelete={() => {
                                                            setSubscriptions(subscriptions.filter(s => s.config.name !== subscription.config.name));
                                                        }} />
                                                    );
                                                })
                                            }
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container spacing={2}>
                                    <Grid item xs={12}>
                                        <DialogContentText>
                                            Advanced Event Filtering
                                        </DialogContentText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box sx={{ background: theme.palette.mode === "dark" ? "#263238" : "#FAFAFA", minHeight: "100px" }}>
                                            <Editor
                                                value={regex}
                                                onValueChange={code => setRegex(code)}
                                                highlight={code => highlight(code, languages.json, "json")}
                                                padding={10}
                                                textareaClassName={styles.editor}
                                                placeholder={JSON.stringify(regexPlaceholder, null, 2)}
                                                style={{
                                                    fontFamily: "\"Fira code\", \"Fira Mono\", monospace",
                                                    fontSize: 12
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => onClose()} variant="outlined">Cancel</Button>
                        </DialogActions>
                    </>
                )
            }
        </Dialog>
    );
};
