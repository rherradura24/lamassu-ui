import { Box, Breadcrumbs, Button, makeStyles, Paper, Typography } from "@material-ui/core"
import { useKeycloak } from "@react-keycloak/web";
import { LamassuModalPolyphormic } from "components/Modal"
import { useState } from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory } from "react-router";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import EmptyOverlayGrid from "components/DataGridCustomComponents/EmptyOverlayGrid"
import { LamassuChip } from "components/LamassuChip";

const useStyles = makeStyles((theme) => ({
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gridTemplateRows: "1fr",
        height: "100%"
    },
    content:{
        gridRow: 1,
        gridColumn: "1/4",

    },
    contentCollapsed:{
        gridRow: 1,
        gridColumn: "1/3",

    },
    rightSidebar: {
        gridRow: 1,
        gridColumn: 3,
    }    
}))


const DeviceInspect = () => {
    let history = useHistory();
    const classes = useStyles();
    const { keycloak, initialized } = useKeycloak()
    const [modalInfo, setModalInfo] = useState({open: false, type: null})

    const resetModal = () =>{
        setModalInfo({
            open: false,
            type: null,
        })
    }

    const handleDeviceCreateClick = () => {
        setModalInfo({
            open: true,
            type: "deviceCreate",
            handleSubmit: ()=>{resetModal()},
        })
    }

    return(
        <>
            <Box className={classes.grid}>
                <Box className={classes.content} style={{padding: 20}}>
                    <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Typography onClick={()=>{history.push("/")}} style={{cursor: "pointer"}}> Home </Typography>  
                            <Typography onClick={()=>{history.push("/dms/list")}} style={{cursor: "pointer"}}> DMSs </Typography>  
                            <Typography onClick={()=>{history.push("/dms/devices")}} style={{cursor: "pointer"}}> Devices </Typography>  
                            <Typography color="textPrimary">Device X</Typography>
                        </Breadcrumbs>
                    </Box>

                    <Box component={Paper} style={{marginTop: 20, padding: 20}}>
                        <Box style={{display: "flex", marginBottom: 5}}>
                            <Typography variant="button" style={{minWidth: 150}}>Davice Alias</Typography>
                            <Typography>Smart Sensor</Typography>
                        </Box>
                        <Box style={{display: "flex", marginBottom: 5}}>
                            <Typography variant="button" style={{minWidth: 150}}>Davice UUID</Typography>
                            <Typography>8501a-7510-e5ea1-63021</Typography>
                        </Box>
                        <Box style={{display: "flex", marginBottom: 5}}>
                            <Typography variant="button" style={{minWidth: 150}}>Status</Typography>
                            <LamassuChip status={"green"} label={"Provisioned"}/>
                        </Box>
                        <Box style={{display: "flex", marginBottom: 5}}>
                            <Typography variant="button" style={{minWidth: 150}}>Key Type</Typography>
                            <Typography>ECDSA</Typography>
                        </Box>
                        <Box style={{display: "flex", marginBottom: 5}}>
                            <Typography variant="button" style={{minWidth: 150}}>Key Bits</Typography>
                            <Typography>256</Typography>
                        </Box>
                        <Box style={{display: "flex", marginBottom: 5}}>
                            <Typography variant="button" style={{minWidth: 150}}>Key Strength</Typography>
                            <LamassuChip status={"orange"} label={"Medium"}/>
                        </Box>
                    </Box>
                       
                </Box>
                <LamassuModalPolyphormic handleClose={()=>resetModal()} {...modalInfo}/>
            </Box>    
        </>
    )
}

export { DeviceInspect }