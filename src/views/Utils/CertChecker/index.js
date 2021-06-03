import { Box, makeStyles, Paper, TextField, Typography } from "@material-ui/core"
import { useEffect, useRef, useState } from "react";
import {Certificate, PrivateKey, PublicKey} from "@fidm/x509"
import { blue, green, grey, red } from "@material-ui/core/colors";
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';


const useStyles = makeStyles((theme) => ({
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gridTemplateRows: "1fr",
        height: "100%",
        gridGap: 10
    },
    col1:{
        gridRow: 1,
        gridColumn: 1,

    },
    col2:{
        gridRow: 1,
        gridColumn: 2,

    },
    col3: {
        gridRow: 1,
        gridColumn: 3,
    }    
}))


const CertChecker = () => {
    const inputFileRef = useRef(null);
    const classes = useStyles()
    const [caContent, setCAContent] = useState("")
    const [certContent, setCertContent] = useState("")
    const [validationResult, setValidationResult] = useState(null)

    useEffect(()=>{
        if (caContent !== "" && certContent !== "") {
            try {
                var ca = Certificate.fromPEM(caContent)
                var crt = Certificate.fromPEM(certContent)
                crt.checkSignature(ca)
                setValidationResult(true)
            } catch (error) {
                console.log(error);
                setValidationResult(false)
            }
        }else{
            setValidationResult(null)
        }
    }, [caContent, certContent])

    const onFileChange = (e) => {
        /*Selected files data can be collected here.*/
        var files = e.target.files
        if (files.length > 0) {
            var reader = new FileReader();
            reader.readAsText(files[0], "UTF-8");
            reader.onload = (evt) => {
                var content = evt.target.result;
                setCertContent(content)
            }
        }else{
            console.log("Nofile");
        }
        inputFileRef.current.value = ""
    }


    return (
        <Box style={{padding: 20}}>
            <Box component={Paper} style={{padding: 20}} className={classes.grid}>
                <TextField
                    id="standard-multiline-flexible"
                    label="CA certificate content"
                    multiline
                    rows={30}
                    className={classes.col1}
                    style={{marginRight: 20}}
                    inputProps={{style: {fontSize: 12, fontFamily: "monospace"}}}
                    variant="outlined"
                    fullWidth
                    value={caContent}
                    onChange={(ev)=>{setCAContent(ev.target.value)}}
                    />
                <TextField
                    id="standard-multiline-flexible"
                    label="End certificate content"
                    rows={30}
                    multiline
                    className={classes.col2}
                    rows={30}
                    inputProps={{style: {fontSize: 12, fontFamily: "monospace"}}}
                    variant="outlined"
                    fullWidth
                    value={certContent}
                    onChange={(ev)=>{setCertContent(ev.target.value)}}
                    />
                <Box className={classes.col3} style={{display: "flex", justifyContent: "center", alignItems: "center", padding: 20}}>
                    {
                        validationResult !== null ? (
                            validationResult ? (
                                <Box style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                    <VerifiedUserOutlinedIcon style={{ fontSize: 50, color: green[400]}}/>
                                    <Typography variant="button">Validation success</Typography> 
                                </Box>
                            ) : (
                                <Box style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                                    <BlockOutlinedIcon style={{ fontSize: 50, color: red[400]}}/>
                                    <Typography variant="button">Validation Error</Typography> 
                                </Box>
                            )
                        ) : (
                        <Box style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <ErrorOutlineOutlinedIcon style={{ fontSize: 50, color: grey[400]}}/>
                            <Typography variant="button">Introduce both certs</Typography> 
                        </Box>
                        )
                    }
                </Box>
            </Box>
        </Box>
    )
}

export {CertChecker}