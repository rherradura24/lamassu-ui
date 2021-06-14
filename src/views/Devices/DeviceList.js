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
    },
    cell:{
        "& .MuiDataGrid-cell": {
            outline: "none!important",
            cursor: "pointer"
        }
    }
}))

const DeviceList = ({ devicesData, createDevice }) => {
    console.log(devicesData);
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
            handleSubmit: (data)=>{createDevice(data); resetModal()},
        })
    }

    const columns = [
        { field: 'id', headerName: 'Device UUID', width: 350 },
        { field: 'alias', headerName: 'Device Alias', width: 200 },
        { field: 'dms', headerName: 'DMS', width: 200 },
        { field: 'common_name', headerName: 'Common Name', width: 200 },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 150,
            renderCell: (params) => {
                if (params.value == "DEVICE_CREATED" || params.value == "CERT_EXPIRED") {
                    return <LamassuChip label={params.value} status={"orange"} rounded={false} />
                } else if (params.value == "CERT_REVOKED"){
                    return <LamassuChip label={params.value} status={"red"} rounded={false} />
                } else {    // sttatus == issued
                    return <LamassuChip label={params.value} status={"green"} rounded={false} />
                }
            }
        },
        { field: 'key_type', headerName: 'Key Type', width: 110 },
        { field: 'key_bits', headerName: 'Key Bits', width: 110 },
        { 
            field: 'key_strength', 
            headerName: 'Key Strength', 
            width: 140,
            renderCell: (params) => {
                if (params.value == "medium") {
                    return <LamassuChip label={params.value} status={"orange"} rounded={false} />
                } else if (params.value == "low"){
                    return <LamassuChip label={params.value} status={"red"} rounded={false} />
                } else {    // sttatus == issued
                    return <LamassuChip label={params.value} status={"green"} rounded={false} />
                }
            }
        },
    ]

    return(
        <>
            <Box className={classes.grid}>
                <Box className={classes.content} style={{padding: 20}}>
                    <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Typography onClick={()=>{history.push("/")}} style={{cursor: "pointer"}}> Home </Typography>  
                            <Typography onClick={()=>{history.push("/dms/list")}} style={{cursor: "pointer"}}> DMSs </Typography>  
                            <Typography color="textPrimary">Devices</Typography>
                        </Breadcrumbs>
                        <Box>
                            <Button
                                color="default"
                                startIcon={<AddCircleIcon />}
                                style={{marginRight: 10}}
                                onClick={handleDeviceCreateClick}
                            >
                                Create Device
                            </Button>
                        </Box>
                    </Box>

                    <Box component={Paper} style={{marginTop: 20}}>
                        <DataGrid
                            classes={{root: classes.cell}}
                            autoHeight={true}
                            components={{
                                Toolbar: GridToolbar,
                                NoRowsOverlay: EmptyOverlayGrid
                            }}
                            rows={devicesData}
                            columns={columns}
                            pageSize={12}
                            onRowClick={(param, ev)=>{
                                history.push("/dms/devices/" + param.id)
                            }}
                        />
                    </Box>
                </Box>
                <LamassuModalPolyphormic handleClose={()=>resetModal()} {...modalInfo}/>
            </Box>    
        </>
    )
}

export {
    DeviceList
}