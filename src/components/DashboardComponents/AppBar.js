import { Box, Typography, useTheme } from "@mui/system";

import { useState } from "react";
import { Badge, MenuItem, Select } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

const AppBar = ({ className, background, logo, notificationsCount, onNotificationsClick=()=>{} }) => {
    const theme = useTheme()

    return (
        <Box className={className} style={{ background: theme.palette.secondary.main, display: "flex", alignItems: "center", padding: "0px 10px", justifyContent: "space-between"}}>
            {logo}
            <div style={{ background: theme.palette.secondary.main, height: 50, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Badge badgeContent={notificationsCount} color="primary" onClick={onNotificationsClick} style={{marginRight: 30, cursor: "pointer"}}>
                    <NotificationsIcon style={{color: "#F1F2F8"}}/>
                </Badge>
                <LogoutIcon style={{color: "#F1F2F8", cursor: "pointer"}}/>
            </div>
        </Box>
    );
}

export { AppBar }