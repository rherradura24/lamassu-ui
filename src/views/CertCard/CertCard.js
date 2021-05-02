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


const CertCard = ({ casData }) => {
  const [display, setDisplay] = useState(false);
  const theme = useTheme()
  const verbs = {
    GET: green[400],
    POST: blue[400],
    PUT: orange[400],
    DELETE: red[400],
  }
  
  console.log(casData); //REPLACE data WITH casDATA
  const data = [
    [
      {label: "Country", content: "ES"},
      {label: "State", content: "Gipuzkoa"},
      {label: "Locality", content: "Donostia"},
      {label: "Organization", content: "LKS"},
      {label: "Organization Unit", content: "NEXT"},
      {label: "Common Name", content: "ca.lksnext.es"},
    ],[
      {label: "Country", content: "ES"},
      {label: "State", content: "Gipuzkoa"},
      {label: "Locality", content: "Arrasate"},
      {label: "Organization", content: "Ikerlan"},
      {label: "Organization Unit", content: "ZPD"},
      {label: "Common Name", content: "ca.ikerlan.es"},
    ], [
      {label: "Country", content: "ES"},
      {label: "State", content: "Gipuzkoa"},
      {label: "Locality", content: "Arrasate"},
      {label: "Organization", content: "Ikerlan"},
      {label: "Organization Unit", content: "ZPD"},
      {label: "Common Name", content: "ca.ikerlan.es"},
    ], [
      {label: "Country", content: "ES"},
      {label: "State", content: "Gipuzkoa"},
      {label: "Locality", content: "Arrasate"},
      {label: "Organization", content: "Ikerlan"},
      {label: "Organization Unit", content: "ZPD"},
      {label: "Common Name", content: "ca.ikerlan.es"},
    ],    
  ]

  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
    {
        data.map(datapoint => (
          <Card style={{margin: 10, width: 500, borderTop: "3px solid " + theme.palette.primary.main}}>
            <div style={{padding:10 , height: 40, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <div>
                <Typography variant="h5" component="h2" color="textPrimary">
                  {datapoint.filter(certProp => certProp.label == "Common Name")[0].content}
                </Typography>
              </div>
              <div>
                <Chip label="Issued" style={{background: green[600]}}/>
              </div>
            </div>
            <CardContent>
              <DenseTable data={datapoint}/>
            </CardContent>
            <CardActions disableSpacing>
              <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                <div>
                  <Tooltip title="Emmited certs">
                    <IconButton>
                      <ListIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Download CA cert">
                    <IconButton>
                      <GetAppIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Inspect CA">
                    <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Revoke CA">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              
            </CardActions> 
        </Card>
      ))
    }
    </div>     
  );
}

export default CertCard;