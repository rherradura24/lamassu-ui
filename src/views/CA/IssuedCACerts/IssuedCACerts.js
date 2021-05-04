import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Box, Fade, makeStyles, Paper } from '@material-ui/core';
import { green, orange, red } from '@material-ui/core/colors';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import EmptyOverlayGrid from "components/DataGridCustomComponents/EmptyOverlayGrid"
import CertInspectorSideBar from 'views/CertInspectorSideBar';
import { LamassuModal } from 'components/Modal';
import { useState } from 'react';
import downloadFile from "utils/FileDownloader";
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


const IssuedCACerts = ({certsData}) => {
    const classes = useStyles()

    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
    const [rightSidebarCertId, setRightSidebarCertId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState({})

    const handleCertRevocationClick = (certId) => {
        setModalInfo({title: "Revoke CA: " + certId, msg: "You are about to revoke a CA. By revoing the certificate, you will also revoke al emmited certificates."})
        setModalOpen(true)
    }
    
    const handleCertInspect = (certId) => {
        setRightSidebarCertId(certId)
        setRightSidebarOpen(true)
    }

    const handleCertDownload = (certId, certContent) => {
        downloadFile("CA-"+certId+".crt", certContent)
    }

    const columns = [
        { field: 'id', headerName: 'Serial Number', width: 200 },
        { field: 'subjectDN', headerName: 'Subject Distinguished Name', width: 500 },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 100,
            renderCell: (params) => {
                var mainColor, backgroundColor, status;
                if (params.value == "expired") {
                    mainColor = orange[600]
                    status = "Expired"
                } else if (params.value == "revoked"){
                    mainColor = red[400]
                    status = "Revoked"
                } else {    // sttatus == issued
                    mainColor = green[400]
                    status = "Issued"
                }
                return (
                    <div style={{border: "1.5px solid " + mainColor, color: mainColor, display: "flex", borderRadius: 15, fontSize: "12px",
                        justifyContent: "center", alignItems: "center", height: 25, width: 80}}>
                        {status}
                    </div>
                )
            }
        },
        { field: 'validFrom', headerName: 'Valid From', type: "dateTime", width: 200 },
        { field: 'validTo', type: "dateTime", headerName: 'Valid To', width: 200 }
      ];

    const data = certsData.map(certData => {
        return {
            id: certData.serial_number,
            subjectDN: JSON.stringify(certData.subject_dn),
            status: certData.status,
            validFrom: certData.validFrom,
            validTo: certData.validTo
        }
    })
    return (
        <Box className={classes.grid}>
            <Box className={rightSidebarOpen ? classes.contentCollapsed : classes.content}>
                <Box style={{padding: 20}}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <Link color="inherit" href="/" >
                            Home
                        </Link>
                        <Link color="inherit" href="/ca/certs" >
                            CAs
                        </Link>
                        <Typography color="textPrimary">Certificates issued by CAs</Typography>
                    </Breadcrumbs>
                    <Box component={Paper} style={{height: "100%", marginTop: 20}}>
                        <DataGrid
                            autoHeight={true}
                            components={{
                                Toolbar: GridToolbar,
                                NoRowsOverlay: EmptyOverlayGrid
                            }}
                            rows={data}
                            columns={columns}
                            onRowClick={(param, ev)=>{
                                handleCertInspect(param.id)
                            }}
                        />
                    </Box>
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
                                handleDownload={()=>{handleCertDownload(rightSidebarCertId, certsData.filter(cert=> cert.serial_number == rightSidebarCertId)[0].crt)}} 
                            />
                        </div>
                    </Fade>
                )
            }
            <LamassuModal open={modalOpen} handleClose={()=>setModalOpen(false)} {...modalInfo}/>
        </Box>
    )
}

export default IssuedCACerts