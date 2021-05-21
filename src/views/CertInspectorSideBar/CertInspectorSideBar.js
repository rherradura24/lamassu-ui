import React, { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, IconButton, Paper, Tab, Tabs, Tooltip, Typography, useTheme } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import DenseTable from "components/DenseTable";
import {Certificate, PrivateKey, PublicKey} from "@fidm/x509"
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { green, grey, orange, red } from '@material-ui/core/colors';

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

const CertInspectorSideBar = ({ handleClose, handleRevoke, handleDownload, certId, certName, certData, className="" }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("0")
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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


  console.log(certId, certData);
  var metadataTable = []
  const certParsed = Certificate.fromPEM(certData.crt)
  
  console.log(certParsed);
  metadataTable.push({
    label: "Serial Number",
    content: certParsed.serialNumber
  });

  metadataTable.push({
    label: "Status",
    content: certParsed.status
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
    content: JSON.stringify(certParsed.validFrom)
  });

  validityTable.push({
    label: "Valid To",
    content: JSON.stringify(certParsed.validTo)
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
    <Box component={Paper} elevation={10} className={className} style={{height: "100%", borderRadius: 0}}>
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
          <Tab value="0" label="Decoded Certifcate" />
          <Tab value="1" label="Certificate content"/>
          <Tab value="2" label="Public key"/>
        </TabList >
        <div style={{overflowY: "auto"}}>
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
                <code style={{color: "white", fontSize: "small"}}>
                  {certData.crt}
                </code>
            </div>
          </TabPanel>
          <TabPanel value="2" style={{padding: 0}}>
            <div style={{background: "#333", padding: "10px 20px 10px 20px"}}>
                <code style={{color: "white", fontSize: "small"}}>
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