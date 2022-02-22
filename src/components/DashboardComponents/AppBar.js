import { Box, Typography, useTheme } from "@mui/system";

import { useTranslation } from 'react-i18next'
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { Badge, MenuItem, Select } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

const AppBar = ({ className, background, logo, notificationsCount }) => {
    const [lang, setLang] = useState("en")
    const theme = useTheme()

    console.log(notificationsCount);
    return (
        <Box className={className} style={{ background: theme.palette.secondary.main, display: "flex", alignItems: "center", padding: "0px 10px", justifyContent: "space-between"}}>
            {logo}
            <div style={{ background: theme.palette.secondary.main, height: 50, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

                <Badge badgeContent={notificationsCount} color="primary" style={{marginRight: 30}}>
                    <NotificationsIcon style={{color: "#F1F2F8"}}/>
                </Badge>

                <UserAvatar
                    username="hsaiz"
                    roles={["admin"]}
                />
            </div>
        </Box>
    );
}

export { AppBar }