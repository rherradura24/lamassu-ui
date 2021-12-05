import { Grid, Paper, Typography } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { hexToRGB } from "utils"

export const CertificateCard = ({ name, keySize, keyStrength, status, expirationDate, selected=false, onClick=()=>{}, style={} }) => {
    const theme = useTheme()
    const height = 120
    return(
            <Box elevation={selected ? 4 : 1}  
                component={Paper} 
                onClick={onClick} 
                style={{ width: "auto", height: height, borderRadius: 10, background: theme.palette.background.default, cursor: "pointer", ...style}}
            >
                <Box style={{ borderBottom: `1px solid ${theme.palette.divider}`, width: "100%", height: "60%"}}>
                    <Grid container style={{height: "100%", padding: "0 0 0 30px"}} justifyContent="center" alignItems="center">
                        <Grid item xs={8}>
                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13}}>#{keySize}</Typography>
                            <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 22, lineHeight: "24px"}}>{name}</Typography>
                        </Grid>
                        <Grid item xs={4} container direction="column" justifyContent="center" alignItems="center">
                            <Grid item>
                                <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13}}>Key Strength</Typography>
                            </Grid> 
                            <Grid item>
                                {   
                                    keyStrength === "High" && (
                                    <Box style={{background: theme.palette.success.light, borderRadius: 20, marginLeft: 10, paddingLeft: 10, paddingRight: 10, width: "fit-content"}}>
                                        <Typography style={{color: theme.palette.success.main, fontWeight: "600"}}>{keyStrength}</Typography>
                                    </Box>
                                    )
                                }
                                {
                                    keyStrength === "Medium" && (
                                    <Box style={{background: theme.palette.warning.light, borderRadius: 20, marginLeft: 10, paddingLeft: 10, paddingRight: 10, width: "fit-content"}}>
                                        <Typography style={{color: theme.palette.warning.main, fontWeight: "600"}}>{keyStrength}</Typography>
                                    </Box>
                                    )
                                }
                                {
                                    keyStrength === "Low" && (
                                    <Box style={{background: theme.palette.error.light, borderRadius: 20, marginLeft: 10, paddingLeft: 10, paddingRight: 10, width: "fit-content"}}>
                                        <Typography style={{color: theme.palette.error.main, fontWeight: "600"}}>{keyStrength}</Typography>
                                    </Box>
                                    )
                                }
                            </Grid> 
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{height: "40%"}}>
                    <Grid container style={{height: "100%", padding: "0 0 0 30px"}} justifyContent="center" alignItems="center">
                        <Grid item xs={8}>
                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: "13px"}}>{`${status} · ${expirationDate}`}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "400"}}></Typography>
                        </Grid>
                    </Grid>
                </Box>

                <Box style={{ width: 10, height: height * 0.6 , borderTopRightRadius: 10, borderBottomRightRadius: 10, background: selected ? theme.palette.primary.main : "transparent", position: "relative", top: -height * 0.80}}/>
            </Box>
    )
}