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


const CertCard = ({ title, status, certData, onDownloadClick, onRevokeClick, onInspectClick, onListEmmitedClick, styles={} }) => {
  const theme = useTheme()
  const verbs = {
    GET: green[400],
    POST: blue[400],
    PUT: orange[400],
    DELETE: red[400],
  }
  
  console.log(certData);

  const keys = Object.keys(certData)
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
        <DenseTable dense={true} data={denseTableData}/>
      </CardContent>
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