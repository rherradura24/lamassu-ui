import React from "react"

import { useTheme } from "@emotion/react";
import { Box, InputBase, Paper, TextField, Typography } from "@mui/material"

export const LamassuTextField = ({label=""}) => {
    const theme = useTheme();
    const themeMode = theme.palette.mode

    return (
        <Box>
            {/* <Typography sx={{
                marginLeft: 1,
                fontWeight: 500,
                color: themeMode == "light" ? "#333" : "#ddd",
                fontSize: 13
            }}>
                {label}
            </Typography> */}
            {/* <Box component={Paper} sx={{padding: "5px", height: 30, display: "flex", alignItems: "center", width: "100%", border: `${themeMode == "light" ? "1px solid #eee" : "none"}`}}>
                <InputBase sx={{
                    borderRadius: 1,
                    height: 35,
                    fontSize: 14,
                    padding: '5px 12px',
                    width: "100%"
                }}/>
            </Box> */}
        </Box>

    )
}