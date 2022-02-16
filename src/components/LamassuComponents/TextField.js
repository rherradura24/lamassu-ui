import { Box, InputBase, Typography } from "@mui/material"

export const LamassuTextField = ({label=""}) => {
    return (
        <Box>
            <Typography sx={{
                marginLeft: 1,
                fontWeight: 500,
                color: "#333",
                fontSize: 13
            }}>
                {label}
            </Typography>
            <InputBase sx={{
                borderRadius: 1,
                border: "1px solid #EAEAEB",
                backgroundColor: "#F1F3F4",
                fontSize: 14,
                padding: '5px 12px',
                width: "100%"
            }}/>
        </Box>

    )
}