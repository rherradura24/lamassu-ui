import { Box, Typography, useTheme } from "@mui/system";

import { useTranslation } from 'react-i18next'
import { useState } from "react";
import { LamassuNotifications } from "./LamassuNotifications";
import { UserAvatar } from "./UserAvatar";
import { MenuItem, Select } from "@mui/material";

const AppBar = ({ className, background, logo }) => {
    const [lang, setLang] = useState("en")
    const { t, i18n } = useTranslation()
    const theme = useTheme()

    return (
        <Box className={className} style={{ background: theme.palette.secondary.main, display: "flex", alignItems: "center", padding: "5px 10px", justifyContent: "space-between"}}>
            {logo}
            <div style={{ background: theme.palette.secondary.main, height: 50, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={lang}
                    onChange={(ev) => { setLang(ev.target.value); i18n.changeLanguage(ev.target.value) }}
                    disableUnderline
                    style={{ marginRight: 15 }}
                >
                    <MenuItem value={"es"}>ES</MenuItem>
                    <MenuItem value={"en"}>EN</MenuItem>
                    <MenuItem value={"eus"}>EUS</MenuItem>
                </Select>

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