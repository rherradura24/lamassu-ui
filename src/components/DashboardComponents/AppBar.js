import { Box, Typography, useTheme } from "@mui/system";

import { useTranslation } from 'react-i18next'
import { useState } from "react";
import { LamassuNotifications } from "./LamassuNotifications";
import { UserAvatar } from "./UserAvatar";
import { MenuItem, Select } from "@mui/material";

const AppBar = ({ className, background, logo }) => {
    const [lang, setLang] = useState("en")
    const theme = useTheme()

    return (
        <Box className={className} style={{ background: theme.palette.secondary.main, display: "flex", alignItems: "center", padding: "0px 10px", justifyContent: "space-between"}}>
            {logo}
            <div style={{ background: theme.palette.secondary.main, height: 50, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

                <LamassuNotifications notificationHistory={[]} />

                <UserAvatar
                    username="hsaiz"
                    roles={["admin"]}
                />
            </div>
        </Box>
    );
}

export { AppBar }