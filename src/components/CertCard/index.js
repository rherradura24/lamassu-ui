import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import { Box, Chip, Grid, IconButton, makeStyles, Paper, Tooltip, useTheme } from '@material-ui/core';
import { blue, green, yellow, red, orange } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DenseTable from 'components/DenseTable';

import ListIcon from '@material-ui/icons/List';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const CertCard = ({ title, status, certData, keyStrength, onDownloadClick, onRevokeClick, onInspectClick, onListEmmitedClick, styles={}}) => {
  const theme = useTheme()
   
  const keys = Object.keys(certData)
  console.log(certData);
  const denseTableData = []
  keys.forEach(key => {
    denseTableData.push({
      label: key,
      content: certData[key]
    })
  });
  
  var statusColor;
  if (status == "issued") {
    statusColor = green[400]
  }else if(status == "expired"){
    statusColor = red[400]
  }else if(status == "revoked"){
    statusColor = orange[400]
  }

  const low = (
    <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Typography variant="button">Key Strength: </Typography>
      <Box style={{marginLeft: 5, padding: "0px 5px 0px 5px", borderRadius: 5 , background: theme.palette.type == "light" ? "#FFB1AA" : "#6d504e"}}>
        <Typography variant="button" style={{color: "red"}}>Low</Typography>
      </Box>
    </Box>
  )
  const medium = (
    <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Typography variant="button">Key Strength: </Typography>
      <Box style={{marginLeft: 5, padding: "0px 5px 0px 5px", borderRadius: 5 , background: theme.palette.type == "light" ? "#FFE9C4" : "#635d55"}}>
          <Typography variant="button" style={{color: "orange"}}>Medium</Typography>
        </Box>
      </Box>
  )
  const high = (
    <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
       <Typography variant="button">Key Strength: </Typography>
        <Box style={{marginLeft: 5, padding: "0px 5px 0px 5px", borderRadius: 5 , background: theme.palette.type == "light" ? "#D0F9DB" : "#4a6952"}}>
          <Typography variant="button" style={{color: theme.palette.type === "light" ? "green" : "#25ee32"}}>High</Typography>
        </Box>
    </Box>
  )

  const unknown = (
    <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
       <Typography variant="button">Key Strength: </Typography>
        <Box style={{marginLeft: 5}}>
          <Typography variant="button">Unknown</Typography>
        </Box>
    </Box>
  )


  var strengthElement
  console.log(theme.palette.type);
  if (keyStrength == "low"){
      strengthElement = low
  }else if (keyStrength == "medium"){
    strengthElement = medium
  }else if (keyStrength == "high"){
    strengthElement = high  
  }else{
    strengthElement = unknown
  }

  


  return (
    <Card style={{width: 500, borderTop: "3px solid " + theme.palette.primary.main, ...styles}}>
      <div style={{padding:10 , height: 40, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <div>
          <Typography variant="h5" component="h2" color="textPrimary">
            {title}
          </Typography>
        </div>
        <div>
          <Chip label={status} style={{background: statusColor}}/>
        </div>
      </div>
      <CardContent>
        <DenseTable dense={true} data={denseTableData} parseRowTitle={true}/>
      </CardContent>
      <Box style={{padding:20, display: "flex"}}>
        {strengthElement}
      </Box>
      <CardActions disableSpacing>
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
          <div>
            <Tooltip title="Emmited certs">
              <IconButton onClick={onListEmmitedClick}>
                <ListIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download CA cert">
              <IconButton onClick={onDownloadClick}>
                <GetAppIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Inspect CA">
              <IconButton onClick={onInspectClick}>
                  <VisibilityIcon />
                </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Revoke CA">
              <IconButton onClick={onRevokeClick}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        
      </CardActions> 
    </Card>
  );
}

export {CertCard};