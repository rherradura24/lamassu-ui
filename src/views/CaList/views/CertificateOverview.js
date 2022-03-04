import { useTheme } from "@emotion/react";
import { Certificate } from "@fidm/x509";
import { Grid, Typography } from "@mui/material"
import moment from "moment";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { materialLight, materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

  

export const Overview = ({ca}) => {
    const decodedCert = window.atob(ca.certificate.pem_base64)
    const parsaedCert = Certificate.fromPEM(decodedCert)
    const theme = useTheme()
    const themeMode = theme.palette.mode

    const certificateSubject = {
        country: "Country",
        state: "State / Province",
        locality: "Locality",
        organization: "Organization",
        organizationUnit: "Organization Unit",
        commonName: "Common Name",
    }
    
    const certificateProperties = {
        serialNumber: {
            title: "Serial Number",
            value: parsaedCert.serialNumber
        },
        validFrom: {
            title: "Valid From",
            value: moment(parsaedCert.validFrom).format("D MMMM YYYY")
        },
        validTo: {
            title: "Valid To",
            value: moment(parsaedCert.validTo).format("D MMMM YYYY")
        },
        issuer: {
            title: "Issuer",
            value: parsaedCert.subject.attributes.map(attr => {
                    const label = capitalizeFirstLetter(uncamelize(attr.name))
                    const value = attr.value
                    return `${label}: ${value}`
                }).reduce((previousValue, currentValue) => previousValue == "" ? currentValue : previousValue + "; "+  currentValue, "")
        },
        sans: {
            title: "SANS",
            value: parsaedCert.dnsNames
        },
        signatureAlgorithm: {
            title: "Signature Algorithm",
            value: parsaedCert.signatureAlgorithm
        },
        ocspServer: {
            title: "OCSP Server",
            value: parsaedCert.ocspServer
        },
    }


    return (
        <Grid item container sx={{width: "100%"}} spacing={1}>
            <Grid item xs={7} container spacing={4}>
                <Grid item container direction="column" >
                    <Grid item style={{marginBottom: 10}}>
                        <Typography variant="button" style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 17}}>Subject</Typography>
                    </Grid>
                    <Grid item container spacing={1}>
                        {
                            Object.keys(certificateSubject).map(key=>(
                                <Grid item xs={12} container>
                                    <Grid item xs={5}>
                                        <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 13}}>{certificateSubject[key]}</Typography>
                                    </Grid>
                                    <Grid item xs={7}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 13}}>{ca.subject[key]}</Typography>
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} container style={{height: "fit-content"}}>
                    <Grid item xs={12} style={{marginBottom: 10}}>
                        <Typography variant="button" style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 17}}>Properties</Typography>
                    </Grid>
                    <Grid item xs={12} container>
                    {
                        Object.keys(certificateProperties).map(key=> (
                            <Grid item xs={12} container style={{heigh: 25, marginBottom: 8}}>
                                <Grid item xs={5}>
                                    <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 13}}>{certificateProperties[key].title}</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 13, wordBreak: "break-word"}}>{certificateProperties[key].value}</Typography>
                                </Grid>
                            </Grid>
                        ))
                    }
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={5} container justifyContent={"flex-end"} style={{marginTop: 20}}>
                <SyntaxHighlighter language="json" style={themeMode == "light" ? materialLight : materialDark} customStyle={{fontSize: 10, padding:20, borderRadius: 10, width: "fit-content", height: "fit-content"}} wrapLines={true} lineProps={{style:{color: theme.palette.text.primaryLight}}}>
                    {decodedCert}
                </SyntaxHighlighter>
            </Grid>
        </Grid>
    )
}