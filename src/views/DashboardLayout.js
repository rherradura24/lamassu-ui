import { Box } from "@mui/system";
import { AppBar } from "components/DashboardComponents/AppBar";
import { SideBar } from "components/DashboardComponents/SideBar";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import CaList from "views/CaList";
import "./DashboardLayout.css"
import { Paper, Typography } from "@mui/material";

import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { useTranslation } from "react-i18next";
import { dark, light } from "theme";

export default () => {
    const [darkTheme, setDarkTheme] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    const { t, i18n } = useTranslation()

    const theme = createTheme(darkTheme ? dark : light)

    const routes = [
        {
            menuTitle: "",
            menuItems: [
                {
                    title: t("sidebar.home"),
                    route: "/",
                    icon: <DashboardOutlinedIcon />,
                    content: <CaList />
                }
            ]
        },
        {
            menuTitle: t("sidebar.ca-authorities"),
            menuItems: [
                {
                    title: t("sidebar.cas"),
                    route: "/ca/certs",
                    icon: <AccountBalanceOutlinedIcon/>,
                    content: <CaList />
                },
            ]
        },
        {
            menuTitle: t("sidebar.dms-title"),
            menuItems: [
                {
                    title: "List of DMS",
                    route: "/dms/list",
                    icon: <VerifiedUserOutlinedIcon/>,
                    content: <CaList />
                },
                {
                    title: "Device Manager",
                    route: "/dms/devices",
                    icon: <RouterOutlinedIcon/>,
                    content: <CaList />
                },
            ]
        },
    ]

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Box className={collapsed ? "dashboard-layout-collapsed" : "dashboard-layout"} component={Paper} elevation={0}>
                    <Box className="header">
                        <AppBar 
                            background={"#468AEB"}
                            logo={
                                <div style={{background: "white", borderRadius: 10, height:30, width: 120, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <Typography variant="button">{"AA"}</Typography>
                                </div>
                            }
                        />
                    </Box>
                    <Box className="sidebar">
                        <SideBar 
                            darkTheme={darkTheme} 
                            onTogleDark={()=>{setDarkTheme(!darkTheme)}} 
                            collapsed={collapsed} 
                            onCollapse={()=>{setCollapsed(!collapsed)}}
                            menuConfig={routes}
                        />
                    </Box>
                    <Box className="content">
                        <CaList />
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    )
}