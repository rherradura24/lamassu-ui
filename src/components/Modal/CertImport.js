import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@material-ui/core";
import { useRef, useState } from "react";
import { MenuSeparator } from "views/Dashboard/SidebarMenuItem";
import { LamassuModal } from "./LamassuModal";
const LamassuModalCertImport = ({open, handleClose, handleSubmit}) => {

    const inputFileRef = useRef(null);
    const inputFileRef2 = useRef(null);
    const [caName, setCaName] = useState("")
    const [ttlValue, setTtlValue] = useState(365) 
    const [ttlUnit, setTtlUnit] = useState(24)//24 = days | 24*365 = years 
    const [caCert, setCaCert] = useState("")
    const [cakey, setCaKey] = useState("")
    const [caPemBundle, setCaPemBundle] = useState("")
    const [isPemBundle, setIsPemBundle] = useState(true)

    const onFileChange = (e, setter) => {
        /*Selected files data can be collected here.*/
        var files = e.target.files
        if (files.length > 0) {
            var reader = new FileReader();
            reader.readAsText(files[0], "UTF-8");
            reader.onload = (evt) => {
                var content = evt.target.result;
                setter(content)
            }
        }else{
            console.log("Nofile");
        }
        inputFileRef.current.value = ""
    }

    var disabledBtn = true
    if (isPemBundle) {
        disabledBtn = (caName == "" || caPemBundle == "")
    }else{
        disabledBtn = (caName == "" || cakey == "" || caCert == "")
    }

    return (
        <LamassuModal
            maxWidth="lg" 
            title={"Import CA"}
            msg={"Select a certificate file or paste de appropiate certificate content"}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Import",
                        primary: true,
                        disabledBtn: disabledBtn,
                        onClick: ()=>{
                            if (isPemBundle) {
                                handleSubmit(caName,caPemBundle, parseInt(ttlValue)*ttlUnit)
                            }else{
                                handleSubmit(caName,cakey + "\n" + caCert, parseInt(ttlValue)*ttlUnit)
                            }
                        }
                    }
                ]
            }
            formContent={
                            
                  <Box>
                    <TextField autoFocus margin="dense" id="caName" label="CA Name" fullWidth value={caName} onChange={(ev)=>{setCaName(ev.target.value)}} />
                    <Grid container alignItems="baseline" >
                        <TextField margin="dense" id="ttl" label="Time To Live" type="number" style={{width: 235, marginRight: 20}} value={ttlValue} onChange={ev=>{setTtlValue(ev.target.value)}}/>
                        <FormControl style={{width: 245}}>
                        <InputLabel id="key-type-label">Time To Live Units</InputLabel>
                            <Select
                                labelId="ttl-unit-label"
                                value={ttlUnit}
                                onChange={ev=>{setTtlUnit(ev.target.value)}}
                                autoWidth={false}
                                fullWidth
                            >
                                <MenuItem value={1}>Hours</MenuItem>
                                <MenuItem value={24}>Days</MenuItem>
                                <MenuItem value={24*365}>Years</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <FormControlLabel
                        control={
                        <Switch
                            checked={isPemBundle}
                            onChange={()=>setIsPemBundle(!isPemBundle)}
                            color="primary"
                        />
                        }
                        label="PEM bundle"
                    />
                    {
                        isPemBundle ? (
                            <Box>
                                <Button 
                                    variant="contained" 
                                    fullWidth
                                    onClick={()=>{inputFileRef.current.click() }}
                                >
                                    Select PEM Bundel
                                </Button>
                                <input
                                    type="file"
                                    ref={inputFileRef}
                                    hidden
                                    onChange={(ev)=>onFileChange(ev, setCaPemBundle)}
                                />
                                <Box container style={{margin: 20}}>
                                    <MenuSeparator/>
                                </Box>
                                <TextField
                                    label="PEM bundle content"
                                    multiline
                                    rows={18}
                                    style={{width: 500}}
                                    inputProps={{style: {fontSize: 12, fontFamily: "monospace"}}}
                                    variant="outlined"
                                    fullWidth
                                    value={caPemBundle}
                                    onChange={(ev)=>{setCaPemBundle(ev.target.value)}}
                                />
                            </Box>
                        ) : (
                            <Box style={{display: "flex", justifyContent: "space-between"}}>
                                <Box style={{marginRight: 20}}>
                                    <Button 
                                        variant="contained" 
                                        fullWidth
                                        onClick={()=>{inputFileRef2.current.click() }}
                                    >
                                        Select Certificate
                                    </Button>
                                    <input
                                        type="file"
                                        ref={inputFileRef2}
                                        hidden
                                        onChange={(ev)=>onFileChange(ev, setCaCert)}
                                    />
                                    <Box container style={{margin: 20}}>
                                        <MenuSeparator/>
                                    </Box>
                                    <TextField
                                        label="Certificate content"
                                        multiline
                                        rows={18}
                                        style={{width: 500}}
                                        inputProps={{style: {fontSize: 12, fontFamily: "monospace"}}}
                                        variant="outlined"
                                        fullWidth
                                        value={caCert}
                                        onChange={(ev)=>{setCaCert(ev.target.value)}}
                                    />
                                </Box>
                                <Box>
                                    <Button 
                                        variant="contained" 
                                        fullWidth
                                        onClick={()=>{inputFileRef.current.click() }}
                                    >
                                        Select Private key
                                    </Button>
                                    <input
                                        type="file"
                                        ref={inputFileRef}
                                        hidden
                                        onChange={(ev)=>onFileChange(ev, setCaKey)}
                                    />
                                    <Box container style={{margin: 20}}>
                                        <MenuSeparator/>
                                    </Box>
                                    <TextField
                                        id="standard-multiline-flexible"
                                        label="Private key content"
                                        multiline
                                        rows={18}
                                        style={{width: 500}}
                                        inputProps={{style: {fontSize: 12, fontFamily: "monospace"}}}
                                        variant="outlined"
                                        fullWidth
                                        value={cakey}
                                        onChange={(ev)=>{setCaKey(ev.target.value)}}
                                    />
                                </Box>
                            </Box> 
                        )
                    } 
                </Box>
            }
        />
    )
}

export {LamassuModalCertImport}
