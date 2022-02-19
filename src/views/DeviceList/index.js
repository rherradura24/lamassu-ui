import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, InputBase, Paper } from "@mui/material"
import {AiOutlineSearch} from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';
import { DeviceCard } from "./components/DeviceCard"

export const DeviceList = () => {
    const theme = useTheme()

    const devices = [
        {
            id: "124774",
            icon: "Cg/CgSmartphoneChip",
            iconColor: "#66BB6A",
            alias: "Smart Door",
            description: "(218) 692-6706, 37634 Egret Rd Crosslake, Minnesota(MN)",
            tags : [
                "Deployed",
                "Type2",
                "SMETS1",
            ],
            remainigDaysBeforeExpiration: 15
        },
        {
            id: "71881",
            icon: "Cg/CgSmartHomeWashMachine",
            iconColor: "#2F657B",
            alias: "Smart Wash Machine",
            description: "(530) 546-3605, 1110 Whitehall Ave Kings Beach, California(CA)",
            tags : [
                "Deployed",
                "Type2",
                "SMETS1",
            ],
            remainigDaysBeforeExpiration: 17
        },
        {
            id: "85085",
            icon: "Cg/CgSmartphoneRam",
            iconColor: "#02B6DC",
            alias: "Smart Door",
            description: "(215) 572-6421, 618 Maple Ave Glenside, Pennsylvania(PA)",
            tags : [

            ],
            remainigDaysBeforeExpiration: 37
        },
        {
            id: "71881",
            icon: "Cg/CgSmartHomeWashMachine",
            iconColor: "#2F657B",
            alias: "Smart Wash Machine",
            description: "(530) 546-3605, 1110 Whitehall Ave Kings Beach, California(CA)",
            tags : [
                "Deployed",
                "Type2",
                "SMETS1",
            ],
            remainigDaysBeforeExpiration: 41
        },
        {
            id: "85085",
            icon: "Cg/CgSmartphoneRam",
            iconColor: "#02B6DC",
            alias: "Smart Door",
            description: "(215) 572-6421, 618 Maple Ave Glenside, Pennsylvania(PA)",
            tags : [
                "Deployed",
                "Type2",
                "SMETS1",
            ],
            remainigDaysBeforeExpiration: 3
        },
    ]
    
    return(
        <Box sx={{padding: "25px", height: "calc(100% - 50px)", background: theme.palette.background.lightContrast}}>
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
                            <DeviceCard style={{cursor: "pointer"}} onClick={()=>alert()}  id={device.id} alias={device.alias} description={device.description} tags={device.tags} icon={device.icon} iconColor={device.iconColor} remainigDaysBeforeExpiration={device.remainigDaysBeforeExpiration}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}