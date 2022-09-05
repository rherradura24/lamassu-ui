import { Box, Button, Divider, Grid, IconButton, Paper, Skeleton, Tab, Tabs, TextField, Typography, useTheme } from "@mui/material";
import { LamassuSwitch } from "components/LamassuComponents/Switch";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { materialLight, materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";
import { useDispatch } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";
import * as eventsActions from "ducks/features/events/actions";
import * as eventsSelector from "ducks/features/events/reducer";
import { useAppSelector } from "ducks/hooks";
import { ORequestStatus } from "ducks/reducers_utils";
import moment from "moment";

export const EventsView = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [smtpHost, setSmtpHost] = useState("");
    const [smtpPort, setSmtpPort] = useState("");
    const [from, setFrom] = useState("");
    const [enableSSL, setEnableSSL] = useState(false);
    const [enableStartTLS, setEnableStartTLS] = useState(false);
    const [enableAuthentication, setEnableAuthentication] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [expandedEvents, setExpandedEvents] = useState<Array<string>>([]);
    const [selectedTab, setSelectedTab] = useState(0);

    const eventRequestStatus = useAppSelector((state) => eventsSelector.getEventRequestStatus(state));
    const subscriptionsRequestStatus = useAppSelector((state) => eventsSelector.getSubscriptionRequestStatus(state));

    const registeredEvents = useAppSelector((state) => eventsSelector.getEvents(state));
    const userSubscription = useAppSelector((state) => eventsSelector.getSubscriptions(state));

    useEffect(() => {
        refreshAction();
    }, []);

    const refreshAction = () => {
        dispatch(eventsActions.getEvents.request());
        dispatch(eventsActions.getSubscriptions.request());
    };

    const events = registeredEvents.map(ev => {
        return {
            EventTitle: ev.type,
            EventType: ev.type,
            EventSource: ev.source,
            LastSeen: moment(ev.time).format("YYYY-MM-DD HH:mm:ss"),
            LastSeenDiff: moment(ev.time).fromNow(),
            Subscribed: userSubscription.subscriptions.filter(sub => sub.event_type === ev.type).length > 0,
            Event: ev
        };
    });

    return (
        <Box padding="20px">
            <Box component={Paper}>
                <Box padding="30px 30px 0 30px">
                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px" }}>Notification and Events</Typography>
                    <Tabs value={selectedTab} onChange={(ev, newValue) => setSelectedTab(newValue)} aria-label="basic tabs example" sx={{ marginTop: "10px" }}>
                        <Tab label="Configuration" />
                        <Tab label="Events" />
                    </Tabs>
                </Box>
                <Divider />
                <Grid container spacing="20px" padding="30px">
                    {
                        selectedTab === 0 && (
                            <>
                                <Grid item xs={6} container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField variant="standard" fullWidth label="SMTP HOST" value={smtpHost} onChange={(ev) => setSmtpHost(ev.target.value)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="standard" type="number" fullWidth label="SMTP Port" value={smtpPort} onChange={(ev) => setSmtpPort(ev.target.value)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField variant="standard" fullWidth label="From - Sender Email Address" value={from} onChange={(ev) => setFrom(ev.target.value)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontSize="13px">Enable SSL</Typography>
                                        <LamassuSwitch value={enableSSL} onChange={() => setEnableSSL(!enableSSL)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontSize="13px">Enable StartTLS</Typography>
                                        <LamassuSwitch value={enableStartTLS} onChange={() => setEnableStartTLS(!enableStartTLS)} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography fontSize="13px">Enable Authentiaction</Typography>
                                        <LamassuSwitch value={enableAuthentication} onChange={() => setEnableAuthentication(!enableAuthentication)} />
                                    </Grid>
                                    {
                                        enableAuthentication && (
                                            <>
                                                <Grid item xs={12}>
                                                    <TextField variant="standard" fullWidth label="Username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField variant="standard" fullWidth label="Password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
                                                </Grid>
                                            </>
                                        )
                                    }
                                    <Grid item xs={12} container spacing={"40px"}>
                                        <Grid item><Button variant="contained">Save Changes</Button></Grid>
                                        <Grid item><Button>Cancel</Button></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} container >
                                    <Grid item xs="auto" ><Button variant="contained">Test Connection</Button></Grid>
                                </Grid>
                            </>
                        )
                    }
                    {
                        selectedTab === 1 && (
                            <>
                                <Grid item container>
                                    <Grid item container justifyContent="flex-end">
                                        <Grid xs="auto" item>
                                            <IconButton style={{ backgroundColor: theme.palette.primary.light }} onClick={() => { refreshAction(); }}>
                                                <RefreshIcon style={{ color: theme.palette.primary.main }} />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} container>
                                        <Grid item xs={4}><Typography fontSize="13px" color="#999eaa">Event</Typography></Grid>
                                        <Grid item xs={2} container justifyContent="center"><Typography fontSize="13px" color="#999eaa">Source</Typography></Grid>
                                        <Grid item xs={2} container justifyContent="center"><Typography fontSize="13px" color="#999eaa">Last Seen</Typography></Grid>
                                        <Grid item xs={2} container justifyContent="center"><Typography fontSize="13px" color="#999eaa">Actions</Typography></Grid>
                                        <Grid item xs={2}></Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                                {
                                    eventRequestStatus.status !== ORequestStatus.Pending && subscriptionsRequestStatus.status !== ORequestStatus.Pending
                                        ? (
                                            events.map((event, index) => (
                                                <>
                                                    <Grid item xs={12} container alignItems="center" key={index}>
                                                        <Grid item xs={4}><Typography>{event.EventTitle}</Typography></Grid>
                                                        <Grid item xs={2} container justifyContent="center"><Typography>{event.EventSource}</Typography></Grid>
                                                        <Grid item xs={2} container justifyContent="center" alignItems="center" spacing={2}>
                                                            <Grid item>
                                                                <Typography>{event.LastSeen}</Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography fontSize={"13px"}>({event.LastSeenDiff})</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={2} container justifyContent="center">
                                                            <Button size="small" variant={event.Subscribed ? "outlined" : "contained"} onClick={() => {
                                                                if (event.Subscribed) {
                                                                    dispatch(eventsActions.unsubscribeAction.request({ EventType: event.EventType }));
                                                                } else {
                                                                    dispatch(eventsActions.subscribeAction.request({ EventType: event.EventType }));
                                                                }
                                                            }}>{event.Subscribed ? "Unsubscribe" : "Subscribe"}</Button>
                                                        </Grid>
                                                        <Grid item xs={2} container justifyContent={"flex-end"} spacing={2}>
                                                            <Grid item xs="auto">
                                                                <IconButton onClick={() => {
                                                                    const idx = expandedEvents.indexOf(event.Event.id);
                                                                    if (idx > -1) {
                                                                        setExpandedEvents(prev => { return prev.filter(id => id !== event.Event.id); });
                                                                    } else {
                                                                        setExpandedEvents(prev => [...prev, event.Event.id]);
                                                                    }
                                                                }}>
                                                                    <KeyboardArrowDownIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    {
                                                        expandedEvents.indexOf(event.Event.id) >= 0 && (
                                                            <Grid item xs={12} container alignItems="center" key={index}>
                                                                <SyntaxHighlighter language="json" style={theme.palette.mode === "light" ? materialLight : materialOceanic} customStyle={{ fontSize: 12, padding: 20, borderRadius: 10, width: "100%", height: "fit-content" }} wrapLines={true} lineProps={{ style: { color: theme.palette.text.primaryLight } }}>
                                                                    {JSON.stringify(event.Event, null, 4)}
                                                                </SyntaxHighlighter>
                                                            </Grid>
                                                        )
                                                    }

                                                </>
                                            ))
                                        )
                                        : (
                                            <>
                                                <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                                <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                                <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                            </>
                                        )
                                }
                            </>
                        )
                    }
                </Grid>
            </Box>
        </Box>
    );
};
