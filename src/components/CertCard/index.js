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
import {LamassuChip} from "components/LamassuChip"
import moment from 'moment';

const CertCard = ({ title, status, certData, keyStrength, validUntil, onDownloadClick, onRevokeClick, onInspectClick, onAwsBindPolicyClick, onListEmmitedClick, styles={}}) => {
  const theme = useTheme()
   
  const keys = Object.keys(certData)
  const denseTableData = []
  keys.forEach(key => {
    denseTableData.push({
      label: key,
      content: certData[key]
    })
  });

  var strengthElement = (strengthString) => {
    var txt = "Unknown"
    var color = "unknown"
    if (strengthString == "low"){
      txt = "Low"
      color = "red"
    }else if (strengthString == "medium"){
      txt = "Medium"
      color = "orange"
    }else if (strengthString == "high"){
      txt = "High"
      color = "green"
    }  
    return (
      <LamassuChip label={txt} status={color} rounded={false}/>
  )}

  var statusElement = (status) => {
    var txt = "Unknown"
    var color = "unknown"
    if (status == "issued"){
      txt = "Issued"
      color = "green"
    }else if (status == "expired"){
      txt = "Expired"
      color = "orange"
    }else if (status == "revoked"){
      txt = "Revoked"
      color = "red"
    }
    return (
      <LamassuChip label={txt} status={color}/>
  )}

  return (
    <Card style={{width: 500, borderTop: "3px solid " + theme.palette.primary.main, ...styles}}>
      <div style={{padding:10 , height: 40, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <div>
          <Typography variant="h5" component="h2" color="textPrimary">
            {title}
          </Typography>
        </div>
        <div>
          {statusElement(status)}
        </div>
      </div>
      <CardContent>
        <DenseTable dense={true} data={denseTableData} parseRowTitle={true}/>
      </CardContent>
      <Box style={{padding:20, display: "flex", justifyContent: "space-between"}}>
        <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Typography variant="button" style={{marginRight: 5}}>Key Strength: </Typography>
            {strengthElement(keyStrength)}
        </Box>
        <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Typography variant="button" style={{marginRight: 5}}>Expires: </Typography>
          {
            moment(validUntil).subtract("30", "days").isBefore(moment()) ? (
              <LamassuChip status="red" label={moment(validUntil).format("MMMM D YYYY")} rounded={false}/>
            ):(
              <LamassuChip status="unknown" label={moment(validUntil).format("MMMM D YYYY")} rounded={false}/>
            )
          }
        </Box>
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
            <Tooltip title="AWS CA Policy">
              <IconButton onClick={onAwsBindPolicyClick}>
                  <img src={process.env.PUBLIC_URL + '/assets/images/aws.svg'} height={27}/>
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