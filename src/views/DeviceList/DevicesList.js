import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, InputBase, Paper } from "@mui/material"
import {AiOutlineSearch} from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';
import { DeviceCard } from "./components/DeviceCard"
import { useState } from "react";
import { DeviceInspector } from "./views/DeviceInspector";

export const DeviceList = ({devices}) => {
    const theme = useTheme()
    const [displayDeviceInspector, setDisplayDeviceInspector] = useState(false)

    return(
        <Grid container style={{height: "100%", background: theme.palette.background.lightContrast}}>
            {
                displayDeviceInspector == false ? (
                    <Grid item xs={12} container>
                        <Box sx={{padding: "25px", height: "calc(100% - 50px)"}}>
                            <Grid container alignItems={"center"} sx={{marginBottom: "35px"}} columns={15}>
                                <Box component={Paper} sx={{padding: "5px", height: 30, display: "flex", alignItems: "center", width: 300}}>
                                    <AiOutlineSearch size={20} color="#626365" style={{marginLeft: 10, marginRight: 10}}/>
                                    <InputBase fullWidth={true} style={{color: "#555", fontSize: 14}}/>
                                </Box>
                                <Box component={Paper} elevation={0} style={{borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40, marginLeft: 10}}>
                                    <IconButton style={{background: theme.palette.primary.light}}>
                                        <AddIcon style={{color: theme.palette.primary.main}}/>
                                    </IconButton>
                                </Box>

                            </Grid>
                            <Grid container spacing={3}>
                                {
                                    devices.map(device=>(
                                        <Grid item xs={3}>
                                            <DeviceCard style={{cursor: "pointer"}} onClick={()=>setDisplayDeviceInspector(true)}  id={device.id} alias={device.alias} description={device.description} tags={device.tags} icon={device.icon} iconColor={device.icon_color} remainigDaysBeforeExpiration={device.remainig_days_before_expiration}/>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                    </Grid>
                ) : (
                    <Grid item xs={12} container>
                        <DeviceInspector/>
                    </Grid>
                )
            }
        </Grid>
    )
}