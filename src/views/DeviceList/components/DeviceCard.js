import { useTheme } from "@emotion/react"
import { Box, Grid, Paper, Typography } from "@mui/material"
import { DynamicIcon } from "components/IconDisplayer/DynamicIcon"
import { LamassuChip } from "components/LamassuComponents/Chip"
import {AiFillWarning} from "react-icons/ai"

export const DeviceCard = ({id, alias, description, tags=[], icon, iconColor, remainigDaysBeforeExpiration, ...props }) => {
    const theme = useTheme()

    var alertColorBg = theme.palette.warning.light
    var alertColorIcon = theme.palette.warning.main
    if (remainigDaysBeforeExpiration < 10) {
        alertColorBg = theme.palette.error.light
        alertColorIcon = theme.palette.error.main
    }
    return (
        <Grid container component={Paper} sx={{padding: "10px", width: "100%"}} spacing={1} {...props}>
            <Grid item xs={12} container alignItems="center">
                <Box component={Paper} sx={{padding: "5px", background: iconColor, borderRadius: 2, width: 25, height: 25, display: "flex",justifyContent:"center", alignItems:"center" }}>
                    <DynamicIcon icon={icon} size={22} color="#fff"/>
                </Box>
                <Typography style={{marginLeft: 10}}>{`${alias} #${id}`}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography style={{fontSize: 12}}>{description}</Typography>
            </Grid>
            {
                tags.length > 0 ? (
                    <Grid item xs={12} container spacing={1} style={{marginBottom: 10}}>
                        {
                            tags.map(tag => (
                                <Grid item>
                                    <LamassuChip color={["#555", "#EEEEEE"]} label={tag} compact={true} compactFontSize/>
                                </Grid>
                            ))
                        }
                    </Grid>
                ) : (
                    <Grid item xs={12} style={{height: 37}}/>
                )
            }
            {
                remainigDaysBeforeExpiration > 30 ? (
                    <Grid item xs={12} style={{height: 31}}/>
                ) : (
                    <Grid item xs={12} container justifyContent={"space-between"} sx={{background: alertColorBg, borderRadius: 1, padding: "5px 10px 5px 10px"}}>
                        <Grid item container xs={9}>
                            <AiFillWarning color={alertColorIcon}/>
                            <Typography style={{fontSize: 12, fontWeight: "bold", marginLeft: 5}}>Certificate Expiration</Typography>
                        </Grid>
                        <Grid item xs={3} container justifyContent={"flex-end"}>
                            <Typography style={{fontSize: 12, color: "#555"}}>{`In ${remainigDaysBeforeExpiration} days`}</Typography>
                        </Grid>
                    </Grid>
                )
            }
        </Grid>
    )
}