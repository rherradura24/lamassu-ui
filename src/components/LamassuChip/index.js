import { Box, Typography, useTheme } from "@material-ui/core"

const LamassuChip = ({ status, label, rounded=true, size="medium" }) => { 
    // status:  green | red | orange | unknown
    // size:    medium | small
    const theme = useTheme()

    const green = {
        bg: theme.palette.type == "light" ? "#D0F9DB" : "#4a6952",
        txt: theme.palette.type == "light" ? "green" : "#25ee32"
    }
    const orange = {
        bg: theme.palette.type == "light" ? "#FFE9C4" : "#635d55",
        txt: "orange"
    }
    const red = {
        bg: theme.palette.type == "light" ? "#FFB1AA" : "#6d504e",
        txt: "red"
    }
    const unknownColor = {
        bg: theme.palette.type == "light" ? "#FFB1AA" : "#6d504e",
        txt: "red"
    }

    var color = unknownColor
    if (status == "green"){
        color = green
    }else if (status == "red"){
        color = red
    }else if (status == "orange"){
        color = orange
    }else if (status == "unknown"){
        color = unknownColor
    }

    return(
        
        rounded ? (
            <Box style={{padding: "0px 20px 0px 20px", borderRadius: 20 , height: 25, background: color.bg, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="button" style={{color: color.txt, fontSize: 12}}>{label}</Typography>
            </Box>
        ) : (
            <Box style={{padding: "0px 5px 0px 5px", borderRadius: 5, height: 25, background: color.bg, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="button" style={{color: color.txt, fontSize: 12}}>{label}</Typography>
            </Box>
        )
        
    )

}

export {LamassuChip}