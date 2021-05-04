import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Box, Fade, makeStyles, Slide } from "@material-ui/core";
import { CertCard } from "components/CertCard";
import { LamassuModal } from "components/Modal";
import { useState } from "react";
import downloadFile from "utils/FileDownloader";
import CertInspectorSideBar from "views/CertInspectorSideBar";

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

const CAList = ({casData, onCertInspect}) => {
    console.log(casData);
    const classes = useStyles();

    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
    const [rightSidebarCertId, setRightSidebarCertId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState({})

    const handleCertRevocationClick = (certId) => {
        setModalInfo({title: "Revoke CA: " + certId, msg: "You are about to revoke a CA. By revoing the certificate, you will also revoke al emmited certificates."})
        setModalOpen(true)
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
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <Link color="inherit" href="/" >
                        Home
                        </Link>
                        <Typography color="textPrimary">CAs</Typography>
                    </Breadcrumbs>

                    <Box style={{display: "flex", flexWrap: "wrap", marginTop: 20}}>
                    {
                        casData.map(caData => {
                            return (
                                <CertCard title={caData.name} 
                                    status={caData.status} 
                                    certData={caData.subject_dn}
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
                <LamassuModal open={modalOpen} handleClose={()=>setModalOpen(false)} {...modalInfo}/>
            </Box>
        </>
    )
}

export default CAList