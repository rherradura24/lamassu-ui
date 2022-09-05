import React, { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import { Box } from "@mui/system";
import { AppBar } from "components/DashboardComponents/AppBar";
import { SideBar } from "components/DashboardComponents/SideBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "./DashboardLayout.css";
import { GlobalStyles, Grid, Paper, Typography, IconButton, Slide } from "@mui/material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import RouterOutlinedIcon from "@mui/icons-material/RouterOutlined";
import { MdOutlinePrecisionManufacturing } from "react-icons/md";
import { LamassuNotifications } from "components/DashboardComponents/LamassuNotifications";
import CloseIcon from "@mui/icons-material/Close";
import { Home } from "./Home";
import { createDarkTheme, createLightTheme } from "theme";
import { Notification } from "ducks/features/notifications/models";
import { CAView } from "./CertificateAuthoritiesView";
import { DeviceView } from "./DeviceView";
import { DMSView } from "./DeviceManufacturingSystemView";
import { useAppSelector } from "ducks/hooks";
import * as notificationsSelector from "ducks/features/notifications/reducer";
import { InfoView } from "./Info";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import SelectAllOutlinedIcon from "@mui/icons-material/SelectAllOutlined";
import { EventsView } from "./EventsView";

export const DashboardLayout = () => {
    const cookies = new Cookies();
    if (cookies.get("paletteMode") === undefined) {
        cookies.set("paletteMode", "light", { path: "/" });
    }

    const notificationsList : Array<Notification> = useAppSelector((state) => notificationsSelector.getNotificationList(state));

    const containerRef = useRef(null);

    const [darkTheme, setDarkTheme] = useState(cookies.get("paletteMode") === "dark");
    const [collapsed, setCollapsed] = useState(false);
    const [displayNotifications, setDisplayNotifications] = useState(false);

    const theme = darkTheme ? createDarkTheme() : createLightTheme();

    useEffect(() => {
        cookies.set("paletteMode", darkTheme === true ? "dark" : "light", { path: "/" });
    }, [darkTheme]);

    const routes = [
        {
            menuTitle: "",
            menuItems: [
                {
                    title: "Home",
                    path: "/",
                    link: "/",
                    icon: <DashboardOutlinedIcon key="/"/>,
                    content: <Home/>
                }
            ]
        },
        {
            menuTitle: "Certification Authorities",
            menuItems: [
                {
                    title: "CAs",
                    path: "/cas/*",
                    link: "/cas",
                    icon: <AccountBalanceOutlinedIcon key="/1"/>,
                    content: <CAView />
                }
            ]
        },
        {
            menuTitle: "Registration Authorities",
            menuItems: [
                {
                    title: "Device Manufacturing Systems",
                    path: "/dms/*",
                    link: "/dms",
                    icon: <MdOutlinePrecisionManufacturing key="/2"/>,
                    content: <DMSView/>

                },
                {
                    title: "Device Manager",
                    path: "/devmanager/*",
                    link: "/devmanager",
                    icon: <RouterOutlinedIcon key="/3"/>,
                    content: <DeviceView />
                }
            ]
        },
        {
            menuTitle: "Events",
            menuItems: [
                {
                    title: "Events",
                    path: "/events/*",
                    link: "/events",
                    icon: <MailOutlinedIcon/>,
                    content: <EventsView/>

                }
            ]
        },
        {
            menuTitle: "Simulation Tools",
            menuItems: [
                {
                    title: "Virtual DMS",
                    path: "/vdms/*",
                    link: "/vdms",
                    icon: <SelectAllOutlinedIcon/>,
                    content: <DMSView/>
                },
                {
                    title: "Virtual Device",
                    path: "/vdev/*",
                    link: "/vdev",
                    icon: <SelectAllOutlinedIcon/>,
                    content: <DMSView/>
                }
            ]
        }
    ];

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles
                styles={{
                    "*::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px"
                    },
                    "*::-webkit-scrollbar-track": {
                        background: theme.palette.scrollbar.track
                    },
                    "*::-webkit-scrollbar-thumb": {
                        backgroundColor: theme.palette.scrollbar.thumb,
                        borderRadius: 50,
                        border: 0,
                        outline: "none"
                    }
                }}
            />
            <Router>
                <Box className={collapsed ? "dashboard-layout-collapsed" : "dashboard-layout"} component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
                    <Box className="header">
                        <AppBar
                            background={"#468AEB"}
                            logo={
                                <img src={process.env.PUBLIC_URL + "/assets/LAMASSU.svg"} height={24} style={{ marginLeft: "5px" }}/>
                            }
                            notificationsCount={notificationsList.length}
                            onNotificationsClick={() => setDisplayNotifications(true)}
                        />
                    </Box>
                    <Box className="sidebar" sx={{ borderRight: `1px solid ${theme.palette.background.lightContrast}` }}>
                        <SideBar
                            onToggleDark={() => { setDarkTheme(!darkTheme); }}
                            collapsed={collapsed}
                            onCollapse={() => { setCollapsed(!collapsed); }}
                            menuConfig={routes}
                        />
                    </Box>
                    <Box className="content" sx={{ background: theme.palette.background.lightContrast, display: "flex", flexDirection: "column" }}>
                        <Grid container sx={{ height: "100px", flexGrow: 1, overflow: "hidden" }} ref={containerRef}>
                            <Grid item xs={displayNotifications ? 9 : 12} sx={{ height: "100%" }} >
                                <Routes>
                                    {
                                        routes.map(routeGr => {
                                            return (
                                                routeGr.menuItems.map((route, idx) => {
                                                    return (
                                                        <Route path={route.path} element={route.content} key={idx}/>
                                                    );
                                                })
                                            );
                                        })
                                    }
                                    <Route path="info" element={<InfoView />}/>
                                    <Route path="*" element={<Typography>404</Typography>}/>
                                </Routes>
                            </Grid>
                            <Slide direction="left" in={displayNotifications} container={containerRef.current}>
                                <Grid item xs={3} container component={Paper} elevation={6} direction="column" sx={{ zIndex: 1, borderRadius: 0 }}>
                                    <Grid item container style={{ padding: "10px 20px 10px 20px", borderBottom: `1px solid ${theme.palette.divider}` }} justifyContent="space-between" alignItems={"center"}>
                                        <Grid item>
                                            <Typography style={{ fontWeight: "500", color: theme.palette.text.primary }}>Notifications</Typography>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={() => setDisplayNotifications(false)}>
                                                <CloseIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Box style={{ overflowY: "auto", height: "10px", paddingLeft: 10 }} flexGrow={1}>
                                        <LamassuNotifications notificationsList={notificationsList}/>
                                    </Box>
                                </Grid>
                            </Slide>
                        </Grid>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
};
