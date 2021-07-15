import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, IconButton, makeStyles, Paper, Tab, Tabs, Tooltip, Typography, useTheme } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DenseTable from "components/DenseTable";
import {Certificate, PrivateKey, PublicKey} from "@fidm/x509"
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { green, grey, orange, red } from '@material-ui/core/colors';
import moment from 'moment';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

function uncamelize(str, separator) {
  // Assume default separator is a single space.
  if(typeof(separator) == "undefined") {
    separator = " ";
  }
  // Replace all capital letters by separator followed by lowercase one
  var str = str.replace(/[A-Z]/g, function (letter) 
  {
    return separator + letter.toLowerCase();
  });
  // Remove first separator
  return str.replace("/^" + separator + "/", '');
}

function capitalizeFirstLetter(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}

const useStyles = makeStyles((theme) => ({
  scroll: {
      '&::-webkit-scrollbar': {
          width: "5px",
      },
      '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.scrollbar,
          borderRadius: 20,
      }
  }
}))

const CertInspectorSideBar = ({ handleClose, handleRevoke, handleDownload, certId, certName, certData, className="" }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState("0")
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  
  var statusColor;
  if (certData.status == "issued") {
    statusColor = green[400]
  }else if(certData.status == "expired"){
    statusColor = red[400]
  }else{
    statusColor = grey[400]
  }
  
  var stengthColor;
  if (certData.key_strength == "high") {
    stengthColor = green[400]
  }else if(certData.key_strength == "medium"){
    stengthColor = orange[400]
  }else if(certData.key_strength == "low"){
    stengthColor = red[400]
  }else{
    stengthColor = grey[400]
  }
  
  
  var metadataTable = []
  const certParsed = Certificate.fromPEM(certData.crt)
  
  metadataTable.push({
    label: "Serial Number",
    content: certParsed.serialNumber
  });

  metadataTable.push({
    label: "Status",
    content: <Chip label={certData.status} variant="outlined" size="small" style={{color: statusColor, border: "1px solid " + statusColor}} />
  });

  metadataTable.push({
    label: "Signature Algorithm",
    content: certParsed.signatureAlgorithm
  });

  metadataTable.push({
    label: "Key Type",
    content: certData.key_type
  });

  metadataTable.push({
    label: "Key Bits",
    content: certData.key_bits
  });

  metadataTable.push({
    label: "Key Strength",
    content: <Chip label={certData.key_strength} variant="outlined" size="small" style={{color: stengthColor, border: "1px solid " + stengthColor}} />
  });

  metadataTable.push({
    label: "Is CA",
    content: <Chip color="primary" label={JSON.stringify(certParsed.isCA)} variant="outlined" size="small" />
  });

  metadataTable.push({
    label: "DNS Names",
    content: certParsed.dnsNames.length == 0 ? "None" : certParsed.dnsNames.map(dnsName =>  <Chip color="primary" label={dnsName} variant="outlined" size="small" style={{marginRight: 5}}/>)
  });
  
  var validityTable = []
  validityTable.push({
    label: "Valid From",
    content: <div>{moment(certParsed.validFrom).format("MMMM D YYYY, HH:mm:ss Z").toString()}</div>
  });
  
  validityTable.push({
    label: "Valid To",
    content: <div>{moment(certParsed.validTo).format("MMMM D YYYY, HH:mm:ss Z").toString()}</div>
  });

  var issuerTable = []
  certParsed.issuer.attributes.forEach(attr => {
    issuerTable.push({
      label: capitalizeFirstLetter(uncamelize(attr.name)),
      content: attr.value
    });
  });

  var subjectDNTable = []
  certParsed.subject.attributes.forEach(attr => {
    subjectDNTable.push({
      label: capitalizeFirstLetter(uncamelize(attr.name)),
      content: attr.value
    });
  });


  return (
    <Box component={Paper} elevation={10} className={className} style={{height: "calc(100vh - 50px)", borderRadius: 0}}>
      <div style={{padding:"5px 10px", height: 40, background: theme.palette.secondary.main, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Typography>{`Certificado ${certName}`}</Typography>
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
      <TabContext value={activeTab}>
        <TabList style={{background: theme.palette.certInspector.tabs}} variant="fullWidth" value={activeTab} onChange={handleTabChange} aria-label="simple tabs example">
          <Tab value="0" label="Decoded Certificate" />
          <Tab value="1" label="Certificate content"/>
          <Tab value="2" label="Public key"/>
        </TabList>
        <div className={classes.scroll} style={{overflowY: "auto", height: "calc(100% - 100px)"}}>
          <TabPanel value="0" style={{padding: 0}}>
            <DenseTable data={metadataTable} dense={false}/>
            <Box style={{background: theme.palette.certInspector.separator, padding: 10}}>
              <Typography>Validity</Typography>
            </Box>
            <DenseTable data={validityTable} dense={false}/>
            <Box style={{background: theme.palette.certInspector.separator, padding: 10}}>
              <Typography>Subject Distinguished Name</Typography>
            </Box>
            <DenseTable data={subjectDNTable} dense={false}/>
            <Box style={{background: theme.palette.certInspector.separator, padding: 10}}>
              <Typography>Issuer</Typography>
            </Box>
            <DenseTable data={issuerTable} dense={false}/>
          </TabPanel>
          <TabPanel value="1" style={{padding: 0}}>
            <div style={{background: "#333", padding: "10px 20px 10px 20px"}}>
                <IconButton style={{position:"absolute", right: 20}} onClick={()=>{
                    navigator.clipboard.writeText(certData.crt).then(function() {
                      console.log('Async: Copying to clipboard was successful!');
                    }, function(err) {
                      console.error('Async: Could not copy text: ', err);
                    });                  
                  }}>
                  <AssignmentOutlinedIcon style={{color: "white"}}/>
                </IconButton>
                <code style={{color: "white", fontSize: "small"}}>
                  {certData.crt}
                </code>
            </div>
          </TabPanel>
          <TabPanel value="2" style={{padding: 0}}>
            <div style={{background: "#333", padding: "10px 20px 10px 20px"}}>
              <IconButton style={{position:"absolute", right: 20}} onClick={()=>{
                  navigator.clipboard.writeText(certData.pub_key).then(function() {
                    console.log('Async: Copying to clipboard was successful!');
                  }, function(err) {
                    console.error('Async: Could not copy text: ', err);
                  });                  
                }}>
                <AssignmentOutlinedIcon style={{color: "white"}}/>
              </IconButton>
              <code  style={{color: "white", fontSize: "small"}}>
                {certData.pub_key}
              </code>
            </div>
          </TabPanel>
        </div>
      </TabContext>
    </Box>  
  );
}

export default CertInspectorSideBar;