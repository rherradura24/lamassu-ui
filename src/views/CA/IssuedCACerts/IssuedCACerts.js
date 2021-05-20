import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Box, Chip, Fade, makeStyles, Paper } from '@material-ui/core';
import { green, orange, red } from '@material-ui/core/colors';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import EmptyOverlayGrid from "components/DataGridCustomComponents/EmptyOverlayGrid"
import CertInspectorSideBar from 'views/CertInspectorSideBar';
import { LamassuModalCertRevocation, LamassuModalPolyphormic } from 'components/Modal';
import { useState } from 'react';
import downloadFile from "utils/FileDownloader";
import { styled, withStyles } from '@material-ui/core/styles';

const OkChip = withStyles({
    outlinedPrimary:{
        border:'1px solid ' + green[400],
        color: green[400]
    }
})(Chip)

const WarnChip = withStyles({
    outlinedPrimary:{
        border:'1px solid ' + orange[400],
        color: orange[400]
    }
})(Chip)

const ErrChip = withStyles({
    outlinedPrimary:{
        border:'1px solid ' + red[400],
        color: red[400]
    }
})(Chip)

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


const IssuedCACerts = ({certsData}) => {
    const classes = useStyles()

    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
    const [rightSidebarCertId, setRightSidebarCertId] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalCerId, setModalCertId] = useState(null)

    const handleCertRevocationClick = (certId) => {
        setModalCertId(certId)
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
        { field: 'c', headerName: 'Country', width: 120 },
        { field: 's', headerName: 'State', width: 120 },
        { field: 'o', headerName: 'Organization', width: 200 },
        { field: 'ou', headerName: 'Organization Unit', width: 200 },
        { field: 'cn', headerName: 'Common Name', width: 200 },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 100,
            renderCell: (params) => {
                if (params.value == "expired") {
                    return <WarnChip size="small" color="primary" variant="outlined" label={"Expired"}/>
                } else if (params.value == "revoked"){
                    return <ErrChip size="small" color="primary" variant="outlined" label={"Revoked"}/>
                } else {    // sttatus == issued
                    return <OkChip size="small" color="primary" variant="outlined" label={"Issued"}/>
                }
            }
        },
        { field: 'validFrom', headerName: 'Valid From', type: "dateTime", width: 200 },
        { field: 'validTo', type: "dateTime", headerName: 'Valid To', width: 200 }
      ];

    const data = certsData.map(certData => {
        return {
            id: certData.serial_number,
            c: certData.subject_dn.country,
            s: certData.subject_dn.state,
            o: certData.subject_dn.organization	,
            ou: certData.subject_dn.organization_unit,
            cn: certData.subject_dn.common_name,
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
                            classes={{root: classes.cell}}
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
            <LamassuModalPolyphormic type="certRevoke" open={modalOpen} handleRevocation={()=>{setModalOpen(false)}} handleClose={()=>setModalOpen(false)} certId={modalCerId}/>
        </Box>
    )
}

export default IssuedCACerts