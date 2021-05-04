import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Paper, Tooltip, Typography, useTheme } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DenseTable from "components/DenseTable";

const CertInspectorSideBar = ({ handleClose, handleRevoke, handleDownload, certId, certData, className="" }) => {
  const theme = useTheme();

  console.log(certId, certData);
  const tableData = Object.keys(certData.subject_dn).map(key => {
    return {label: key, content: certData.subject_dn[key]}
  })

  return (
    <Box component={Paper} elevation={10} className={className} style={{height: "100%", borderRadius: 0}}>
      <div style={{padding:"5px 10px", height: 40, background: theme.palette.secondary.main, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Typography>{`Certificado ${certId}`}</Typography>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Tooltip title="Download cert">
            <IconButton onClick={handleDownload}>
              <GetAppIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Revoke cert">
            <IconButton onClick={handleRevoke}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton onClick={handleClose}>
              <CloseIcon/>
            </IconButton>
            </Tooltip>
        </div>
      </div>
      <div style={{overflowY: "auto"}}>
        <div style={{background: "#333", padding: 10}}>
          <code style={{color: "white", fontSize: "small"}}>
            {certData.crt}
          </code>
        </div>
        <DenseTable data={tableData} dense={false}/>
      </div>
    </Box>  
  );
}

export default CertInspectorSideBar;