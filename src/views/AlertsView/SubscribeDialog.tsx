import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import { CloudEvent } from "cloudevents";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WebhookOutlinedIcon from "@mui/icons-material/WebhookOutlined";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-json";
import { useDispatch } from "react-redux";
import * as eventsActions from "ducks/features/alerts/actions";
import { useKeycloak } from "@react-keycloak/web";
import { materialLight, materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";
import CancelIcon from "@mui/icons-material/Cancel";
import { LamassuSwitch } from "components/LamassuComponents/Switch";

interface Props {
    event: CloudEvent | undefined,
    isOpen: boolean,
    onClose: any
}
export const SubscribeDialog: React.FC<Props> = ({ event, isOpen, onClose }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const keycloak = useKeycloak();

    const [email, setEmail] = useState<string>();
    const [advancedFiltering, setAdvancedFiltering] = useState<boolean>(false);

    const [subscriptions, setSubscriptions] = useState<Array<any>>([]);

    const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<string>("email");
    const [selectedSubscriptionName, setSelectedSubscriptionName] = useState<string>("email");
    const [selectedSubscriptionConfig, setSelectedSubscriptionConfig] = useState<any>({});

    const [conditions, setConditions] = useState<Array<any>>([]);
    const [isJsonShemaValid, setIsJsonShemaValid] = useState<boolean>(false);
    const [jsonSchema, setJsonSchema] = useState<string>("");

    const jsonSchemaPlaceholder = {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {
            data: {
                type: "object",
                properties: {
                    alias: {
                        type: "string",
                        pattern: "iot-([a-z]+)"
                    },
                    status: {
                        type: "string"
                    }
                }
            }
        }
    };

    const fulfilsAddSubscriptionRules = (subType: any) => {
        if (selectedSubscriptionName === "") {
            return false;
        }
        switch (subType) {
        case "email":
            if (selectedSubscriptionConfig.email_address && selectedSubscriptionConfig.email_address !== "") {
                return true;
            }
            break;
        case "webhook":
            if (selectedSubscriptionConfig.webhook_url && selectedSubscriptionConfig.webhook_url !== "" && selectedSubscriptionConfig.webhook_method && selectedSubscriptionConfig.webhook_method !== "") {
                return true;
            }
            break;
        case "msteams":
            if (selectedSubscriptionConfig.webhook_url && selectedSubscriptionConfig.webhook_url !== "") {
                return true;
            }
            break;

        default:
            break;
        }
        return false;
    };

    const isJson = (str: string) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        const init = async () => {
            const profile = await keycloak.keycloak.loadUserProfile();
            setEmail(profile.email);
            if (selectedSubscriptionType === "email") {
                setSelectedSubscriptionConfig({ email_address: profile.email });
            }
        };
        init();
    }, []);

    useEffect(() => {
        setSelectedSubscriptionName(
            selectedSubscriptionType
        );
        if (selectedSubscriptionType === "email") {
            setSelectedSubscriptionConfig({
                email_address: email
            });
        } else {
            setSelectedSubscriptionConfig({});
        }
    }, [selectedSubscriptionType]);

    useEffect(() => {
        setJsonSchema("");
        setConditions([]);
    }, [advancedFiltering]);

    useEffect(() => {
        setIsJsonShemaValid(isJson(jsonSchema));
    }, [jsonSchema]);

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
                                                            <img src={process.env.PUBLIC_URL + "assets/msteams.png"} height="20px" />
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
                                                <TextField label="Email Address" disabled variant="standard" fullWidth value={email} />
                                            </Grid>
                                        )
                                    }
                                    {
                                        selectedSubscriptionType === "msteams" && (
                                            <>
                                                <Grid item xs={12}>
                                                    <TextField label="Name" variant="standard" fullWidth value={selectedSubscriptionName} onChange={(ev) => setSelectedSubscriptionName(ev.target.value.trim())} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField label="Incoming Microsoft Teams Webhook URL" variant="standard" fullWidth value={selectedSubscriptionConfig.webhook_url} onChange={(ev) => setSelectedSubscriptionConfig((prev: any) => { return { ...prev, webhook_url: ev.target.value.trim() }; })} />
                                                </Grid>
                                            </>
                                        )
                                    }
                                    {
                                        selectedSubscriptionType === "webhook" && (
                                            <>
                                                <Grid item xs={12}>
                                                    <TextField label="Name" variant="standard" fullWidth value={selectedSubscriptionName} onChange={(ev) => setSelectedSubscriptionName(ev.target.value.trim())} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel>Method</InputLabel>
                                                        <Select
                                                            value={selectedSubscriptionConfig.webhook_method}
                                                            onChange={(ev) => setSelectedSubscriptionConfig((prev: any) => { return { ...prev, webhook_method: ev.target.value }; })}
                                                        >
                                                            <MenuItem value="email">POST</MenuItem>
                                                            <MenuItem value="email">PUT</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField label="Webhook URL" variant="standard" fullWidth value={selectedSubscriptionConfig.webhook_url} onChange={(ev) => setSelectedSubscriptionConfig((prev: any) => { return { ...prev, webhook_url: ev.target.value.trim() }; })} />
                                                </Grid>
                                            </>
                                        )
                                    }
                                    <Grid item xs={12}>
                                        <Button variant="contained" color="primary" disabled={!fulfilsAddSubscriptionRules(selectedSubscriptionType)} onClick={() => {
                                            const subs = subscriptions.filter(s => s.name !== selectedSubscriptionName);
                                            setSubscriptions([...subs, {
                                                type: selectedSubscriptionType,
                                                name: selectedSubscriptionName,
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
                                                        icon = <img src={process.env.PUBLIC_URL + "assets/msteams.png"} height="18px" />;
                                                    } else if (subscription.type === "webhook") {
                                                        icon = <WebhookOutlinedIcon />;
                                                    }

                                                    return (
                                                        <Chip key={index} icon={icon} label={subscription.name} onDelete={() => {
                                                            setSubscriptions(subscriptions.filter(s => s.name !== subscription.name));
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
                                        <Typography>Use advanced filtering</Typography>
                                        <LamassuSwitch checked={advancedFiltering} onChange={(ev) => setAdvancedFiltering(ev.target.checked)} />
                                    </Grid>
                                    {
                                        advancedFiltering && (
                                            <>
                                                <Grid item xs={12}>
                                                    <Typography>Specify a valid JSON Schema to filter an event by combining regex patterns and more</Typography>
                                                    <Box sx={{ background: theme.palette.mode === "dark" ? "#263238" : "#FAFAFA", minHeight: "100px" }}>
                                                        <Editor
                                                            value={jsonSchema}
                                                            onValueChange={code => setJsonSchema(code)}
                                                            highlight={code => highlight(code, languages.json, "json")}
                                                            padding={10}
                                                            placeholder={JSON.stringify(jsonSchemaPlaceholder, null, 0)}
                                                            style={{
                                                                fontFamily: "\"Fira code\", \"Fira Mono\", monospace",
                                                                fontSize: 12
                                                            }}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button variant="contained" color="primary" disabled={!isJsonShemaValid} onClick={() => {
                                                        setConditions([...conditions, jsonSchema]);
                                                    }} >
                                                        Add Event Filter
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} container spacing={2}>
                                                    {
                                                        conditions.map((regex, index) => {
                                                            return (
                                                                <Grid key={index} item xs={6} container>
                                                                    <Grid item xs={12} container sx={{ background: theme.palette.mode === "light" ? "#fafafa" : "#263238", borderRadius: "10px", padding: "5px", overflowX: "auto", maxHeight: "320px" }}>
                                                                        <Grid item xs={12} container justifyContent="flex-end">
                                                                            <Grid item xs="auto">
                                                                                <IconButton size="small" onClick={() => setConditions(conditions.filter(c => c !== regex))}>
                                                                                    <CancelIcon sx={{ fontSize: "20px" }} />
                                                                                </IconButton>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <SyntaxHighlighter language="json" style={theme.palette.mode === "light" ? materialLight : materialOceanic} customStyle={{ margin: 0, padding: 0, fontSize: 10, width: "fit-content", height: "fit-content" }} wrapLines={true} lineProps={{ style: { color: theme.palette.text.primaryLight } }}>
                                                                            {JSON.stringify(JSON.parse(regex), null, 2)}
                                                                        </SyntaxHighlighter>
                                                                    </Grid>
                                                                </Grid>
                                                            );
                                                        })
                                                    }
                                                </Grid>
                                            </>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => onClose()} variant="outlined">Cancel</Button>
                            <Button disabled={subscriptions.length === 0} onClick={() => { dispatch(eventsActions.subscribeAction.request({ EventType: event.type, Channels: subscriptions, Conditions: conditions })); onClose(); }} variant="contained">Subscribe</Button>
                        </DialogActions>
                    </>
                )
            }
        </Dialog>
    );
};
