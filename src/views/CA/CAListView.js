import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Box, Button, Fade, makeStyles, Slide } from "@material-ui/core";
import { CertCard } from "components/CertCard";
import { LamassuModalCertRevocation, LamassuModalPolyphormic } from "components/Modal";
import { useState } from "react";
import downloadFile from "utils/FileDownloader";
import CertInspectorSideBar from "views/CertInspectorSideBar";

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

const CAList = ({casData, importCA, createCA, revokeCA}) => {
    const classes = useStyles();

    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
    const [rightSidebarCertId, setRightSidebarCertId] = useState(null)
    const [modalInfo, setModalInfo] = useState({open: false, type: null})

    const resetModal = () =>{
        setModalInfo({
            open: false,
            type: null,
        })
    }

    const handleCaCreateClick = () => {
        setModalInfo({
            open: true,
            type: "caCreate",
            handleSubmit: (data)=>{createCA(data); resetModal()}
        })
    }

    const handleCaImportClick = () => {
        setModalInfo({
            open: true,
            type: "certImport",
            handleSubmit: (crt)=>{importCA(crt); resetModal()}
        })
    }
    
    const handleCertRevocationClick = (certId) => {
        setModalInfo({
            open: true,
            type: "certRevoke",
            handleRevocation: ()=>{revokeCA(certId); resetModal()},
            certId: certId
        })
    }
    
    const handleCertInspect = (certId) => {
        setRightSidebarOpen(true)
    }

    const handleCertDownload = (certId, certContent) => {
        downloadFile("CA-"+certId+".crt", certContent)
    }

    return (
        <>
            <Box className={classes.grid}>
                <Box className={rightSidebarOpen ? classes.contentCollapsed : classes.content} style={{padding: 20}}>
                    <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link color="inherit" href="/" >
                                Home
                            </Link>
                            <Typography color="textPrimary">CAs</Typography>
                        </Breadcrumbs>
                        <Box>
                            <Button
                                color="default"
                                startIcon={<AddCircleIcon />}
                                style={{marginRight: 10}}
                                onClick={handleCaCreateClick}
                            >
                                Create CA
                            </Button>
                            <Button
                                color="default"
                                startIcon={<CloudUploadIcon />}
                                onClick={handleCaImportClick}
                            >
                                Import CA
                            </Button>
                        </Box>
                    </Box>

                    <Box style={{display: "flex", flexWrap: "wrap", marginTop: 20}}>
                    {
                        casData.map(caData => {
                            return (
                                <CertCard title={caData.name} 
                                    status={caData.status} 
                                    keyBits={caData.keyBits}
                                    keyType={caData.keyType}
                                    certData={Object.assign({}, caData.subject_dn, {keyType: caData.keyType, keyBits: caData.keyBits})}
                                    key={caData.serial_number} 
                                    styles={{margin: 10}}
                                    onDownloadClick={()=>{handleCertDownload(caData.serial_number, caData.crt)}}
                                    onInspectClick={()=>{setRightSidebarCertId(caData.serial_number); handleCertInspect()}}
                                    onRevokeClick={()=>{handleCertRevocationClick(caData.serial_number)}}
                                    onListEmmitedClick={()=>{}}
                                /> 
                            )
                        })
                    }
                    </Box>
                </Box>
                {
                    rightSidebarOpen && (
                        <Fade timeout={500} in={rightSidebarOpen}>
                            <div>
                                <CertInspectorSideBar 
                                    className={classes.rightSidebar} 
                                    certId={rightSidebarCertId}
                                    handleClose={()=>{setRightSidebarOpen(false)}} 
                                    handleRevoke={()=>{handleCertRevocationClick(rightSidebarCertId)}} 
                                    handleDownload={()=>{handleCertDownload(rightSidebarCertId, casData.filter(cert=> cert.serial_number == rightSidebarCertId)[0].crt)}} 
                                />
                            </div>
                        </Fade>
                    )
                }
                <LamassuModalPolyphormic handleClose={()=>resetModal()} {...modalInfo}/>
            </Box>
        </>
    )
}

export default CAList