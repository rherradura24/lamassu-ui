import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Box, Chip, Fade, FormControlLabel, LinearProgress, makeStyles, Paper, Switch } from '@material-ui/core';
import { green, orange, red } from '@material-ui/core/colors';
import EmptyOverlayGrid from "components/DataGridCustomComponents/EmptyOverlayGrid"
import CertInspectorSideBar from 'views/CertInspectorSideBar';
import { LamassuModalCertRevocation, LamassuModalPolyphormic } from 'components/Modal';
import { useState } from 'react';
import downloadFile from "utils/FileDownloader";
import { styled, withStyles } from '@material-ui/core/styles';
import { LamassuChip } from 'components/LamassuChip';
import moment from 'moment';
import { Certificate } from '@fidm/x509';
import { useHistory } from 'react-router';

import {
    DataGrid,
    GridToolbarContainer,
    GridColumnsToolbarButton,
    GridFilterToolbarButton,
    GridDensitySelector,
    GridToolbarExport,
    useGridSlotComponentProps,
    GridOverlay,
    GridToolbar
  } from '@material-ui/data-grid';

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


function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <LinearProgress />
        </div>
      </GridOverlay>
    );
  }

const IssuedCACerts = ({loadingData, certsData, revokeCert, reloadCerts}) => {
    const classes = useStyles()
    let history = useHistory();

    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
    const [rightSidebarCert, setRightSidebarCert] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalCert, setModalCert] = useState(null)
    const [includeLamassuSystemCerts, setIncludeLamassuSystemCerts] = useState(false)

    const handleCertRevocationClick = (certId, cn, issuerCaName) => {
        setModalCert({certId: certId, certCommonName: cn, issuerCaName: issuerCaName})
        setModalOpen(true)
    }
    const handleCertRevocationSubmit = (certId, issuerCaName) => {
        revokeCert(certId, issuerCaName)
        setModalOpen(false)
    }
    
    const handleCertInspect = (certId) => {
        const cert = certsData.filter(cert=> cert.serial_number == certId)[0]
        setRightSidebarCert({
            certId: certId,
            cert: cert
        })
        setRightSidebarOpen(true)
    }

    const handleCertDownload = (certId, certContent) => {
        downloadFile("CA-"+certId+".crt", certContent)
    }

    const handleIncludeSystemCertsChange = (checked) => {
        setIncludeLamassuSystemCerts(checked); 
        if (checked) {
            reloadCerts("all")
        }else{
            reloadCerts("ops")
        }
    }

    const columns = [
        { field: 'id', headerName: 'Serial Number', width: 200 },
        { field: 'issuer', headerName: 'Issuer', width: 250 },
        { field: 'common_name', headerName: 'Common Name', width: 200 },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 100,
            renderCell: (params) => {
                if (params.value == "expired") {
                    return <LamassuChip label={"Expired"} status={"orange"} rounded={false} />
                } else if (params.value == "revoked"){
                    return <LamassuChip label={"Revoked"} status={"red"} rounded={false} />
                } else {    // sttatus == issued
                    return <LamassuChip label={"Issued"} status={"green"} rounded={false} />
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
        { 
            field: 'valid_from', 
            type: 'dateTime', 
            headerName: 'Valid from',
            width: 250,
            renderCell: (params) => {
                return moment(params.value).format("MMMM D YYYY, HH:mm:ss Z").toString()
            }
        },
        { 
            field: 'valid_to', 
            type: 'dateTime', 
            headerName: 'Valid until',
            width: 250,
            
            renderCell: (params) => {
                return moment(params.value).format("MMMM D YYYY, HH:mm:ss Z").toString()
            }
        },
      ];
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const issuerFilter = urlParams.get('issuer')
    const expiresDays = urlParams.get('expires')
    
    const data = certsData.map(certData => {
        return {
            id: certData.serial_number,
            issuer: certData.ca_name,
            common_name: certData.common_name,
            status: certData.status,
            key_type: certData.key_type,
            key_bits: certData.key_bits,
            key_strength: certData.key_strength,
            valid_from: new Date(moment(certData.valid_from).unix()*1000),
            valid_to: new Date(moment(certData.valid_to).unix()*1000),
        }
    })

    var filterModel = null
    if (issuerFilter != null){
        filterModel = {
            items:[
                { columnField: 'issuer', operatorValue: 'equals', value: issuerFilter },
            ]
        }
    }
    if (expiresDays != null){
        const date = moment().add(expiresDays, "days")
        filterModel = {
            items:[
                { columnField: 'valid_to', operatorValue: 'before', value: date.format("YYYY-MM-DD")+"T"+ date.format("HH:mm")},
            ]
        }
    }

    return (
        <Box className={classes.grid}>
            <Box className={rightSidebarOpen ? classes.contentCollapsed : classes.content}>
                <Box style={{padding: 20}}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <Typography onClick={()=>{history.push("/")}} style={{cursor: "pointer"}}> Home </Typography>  
                        <Typography onClick={()=>{history.push("/ca/certs")}} style={{cursor: "pointer"}}> CAs </Typography>  
                        <Typography color="textPrimary">Certificates issued by CAs</Typography>
                    </Breadcrumbs>
                    <Box component={Paper} style={{height: "100%", marginTop: 20, position: "relative"}}>
                        <Box style={{position: "absolute", right: -10, top: 5}}>
                            <Box>
                                <FormControlLabel 
                                    style={{position: "relative", zIndex:10}}
                                    control={
                                    <Switch
                                        checked={includeLamassuSystemCerts}
                                        onChange={(ev)=>{handleIncludeSystemCertsChange(ev.target.checked)}}
                                        color="primary"
                                        size="small"
                                    />
                                    }
                                    label={<Typography variant="button" color="primary" style={{fontSize: "0.8125rem"}}>Include Lamassu System Certs</Typography>}
                                />
                            </Box>
                        </Box>
                        <DataGrid
                            classes={{root: classes.cell}}
                            autoHeight={true}
                            components={{
                                LoadingOverlay: CustomLoadingOverlay,
                                Toolbar: GridToolbar,
                                NoRowsOverlay: EmptyOverlayGrid,
                            }}
                            loading={loadingData}
                            {...filterModel != null ? {filterModel: filterModel} : {}}
                            rows={data}
                            columns={columns}
                            pageSize={12}
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
                                certId={rightSidebarCert.certId}
                                handleClose={()=>{setRightSidebarOpen(false)}} 
                                handleRevoke={()=>{handleCertRevocationClick(rightSidebarCert.certId,rightSidebarCert.cert.common_name, rightSidebarCert.cert.ca_name)}} 
                                handleDownload={()=>{handleCertDownload(rightSidebarCert.certId, rightSidebarCert.cert.crt)}} 
                            />
                        </div>
                    </Fade>
                )
            }
            <LamassuModalPolyphormic type="certRevoke" open={modalOpen} handleRevocation={()=>{handleCertRevocationSubmit(modalCert.certId, modalCert.issuerCaName)}} handleClose={()=>setModalOpen(false)} {...modalCert}/>
        </Box>
    )
}

export default IssuedCACerts