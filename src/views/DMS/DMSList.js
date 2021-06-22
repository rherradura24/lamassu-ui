import { Box, Breadcrumbs, Button, makeStyles, Typography } from "@material-ui/core"
import { DMSCard } from "components/DMSCard"
import Link from '@material-ui/core/Link';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { LamassuModalPolyphormic } from "components/Modal";
import downloadFile from "utils/FileDownloader";
import { useHistory } from "react-router";

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

const DMSList = ({ dmsListData, dmsPrivKeyResponse, deletePrivKeyStorage, createDmsViaCsr, createDmsViaForm, updateDmsStatus, }) => {
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
    const handleDmsCreateClick = () => {
        setModalInfo({
            open: true,
            type: "dmsCreate",
            handleSubmitViaCsr: (name, csr)=>{createDmsViaCsr(name, csr); resetModal()},
            handleSubmitViaForm: (name, csrForm)=>{createDmsViaForm(name, csrForm); resetModal()}
        })
    }
    const handleDmsApproveClick = (dms) => {
        setModalInfo({
            open: true,
            type: "dmsApproveRequest",
            dmsName: dms.dms_name, 
            dmsId: dms.id,
            handleSubmit: ()=>{updateDmsStatus(dms.id, dms, "APPROVED"); resetModal()}
        })
    }
    const handleDmsDeclineClick = (dms) => {
        setModalInfo({
            open: true,
            type: "dmsDeclineRequest",
            dmsName: dms.dms_name, 
            dmsId: dms.id,
            handleSubmit: ()=>{updateDmsStatus(dms.id, dms, "DENIED"); resetModal()}
        })
    }
    const handleDmsRevokeClick = (dms) => {
        setModalInfo({
            open: true,
            type: "dmsRevokeRequest",
            dmsName: dms.dms_name, 
            dmsId: dms.id,
            handleSubmit: ()=>{updateDmsStatus(dms.id, dms, "REVOKED"); resetModal()}
        })
    }
    const handleDmsServiceDiscoveryInfoClick = (dms) => {
        setModalInfo({
            open: true,
            type: "dmsServiceDiscoveryInfo",
            dmsId: dms.id,
        })
    }
    const handleDmsDownloadClick = (dms) => {
        downloadFile("DMS-"+dms.dms_name+".crt", dms.crt)
    }

    useEffect(()=>{
        if(dmsPrivKeyResponse != null){
            setModalInfo({
                open: true,
                type: "dmsPrivKeyResponse",
                dmsName: dmsPrivKeyResponse.dms_name, 
                dmsId: dmsPrivKeyResponse.dms_id,
                privKey: dmsPrivKeyResponse.key,
                handleSubmit: ()=>{deletePrivKeyStorage(); resetModal()}
            })
        }
    }, [dmsPrivKeyResponse])

    return (
        <>
            <Box className={classes.grid}>
                <Box className={classes.content} style={{padding: 20}}>
                    <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Typography onClick={()=>{history.push("/")}} style={{cursor: "pointer"}}> Home </Typography>  
                            <Typography color="textPrimary">DMSs</Typography>
                        </Breadcrumbs>
                        <Box>
                            <Button
                                color="default"
                                startIcon={<AddCircleIcon />}
                                style={{marginRight: 10}}
                                onClick={handleDmsCreateClick}
                            >
                                Create DMS
                            </Button>
                        </Box>
                    </Box>

                    <Box style={{display: "flex", flexWrap: "wrap", marginTop: 20}}>
                    {
                        dmsListData.map(dmsData => {
                            return (
                                <DMSCard
                                    isAdmin={keycloak.tokenParsed.realm_access.roles.includes("admin")}
                                    title={dmsData.dms_name} 
                                    status={dmsData.status} 
                                    dmsData={{
                                        country: dmsData.country,
                                        state: dmsData.state,
                                        locality: dmsData.locality,
                                        organization: dmsData.organization,
                                        organization_unit: dmsData.organization_unit,
                                        common_name: dmsData.common_name,
                                    }}
                                    onApproval={()=>{handleDmsApproveClick(dmsData)}}
                                    onDecline={()=>{handleDmsDeclineClick(dmsData)}}
                                    onDownloadClick={()=>{handleDmsDownloadClick(dmsData)}}
                                    onRevokeClick={()=>handleDmsRevokeClick(dmsData)}
                                    onServiceDiscoveryInfoClick={()=>{handleDmsServiceDiscoveryInfoClick(dmsData)}}
                                    key={dmsData.name} 
                                    styles={{margin: 10}}
                                /> 
                            )
                        })
                    }
                    </Box>
                </Box>
                <LamassuModalPolyphormic handleClose={()=>resetModal()} {...modalInfo}/>
            </Box>
        </>
    )
}

export default DMSList