import { Box, Typography } from "@mui/material"
import { useTheme } from "@mui/system"


const getColor = (theme, color) => {
    switch (color) {
        case "green":
            return [theme.palette.success.main, theme.palette.success.light]

        case "orange":
            return [theme.palette.warning.main, theme.palette.warning.light]

        case "red":
            return [theme.palette.error.main, theme.palette.error.light]
    
        default:
            return []
    } 
}

export const LamassuChip = ({color, label, rounded}) => {
    const theme = useTheme()
    const colors = getColor(theme, color)
    return (
        
        <Box style={{background: colors[1], borderRadius: rounded ? 15 : 5, marginLeft: 10, padding: "5px 7px 5px 7px", width: "fit-content", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography style={{color: colors[0], fontWeight: "400", fontSize: 12}}>{label}</Typography>
        </Box>
    )
}

export const LamassuStatusChip = ({color, label}) => {
    const theme = useTheme()
    const colors = getColor(theme, color)
    return (
        <Box style={{background: colors[1], borderRadius: 5, marginLeft: 10, padding: "5px 7px 5px 7px", width: "fit-content", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Box style={{marginRight: 10, width: 7, height: 7, background: colors[0], borderRadius: "50%"}}/>
            <Typography style={{color: colors[0], fontWeight: "400", fontSize: 12}}>{label}</Typography>
        </Box>
    )
}