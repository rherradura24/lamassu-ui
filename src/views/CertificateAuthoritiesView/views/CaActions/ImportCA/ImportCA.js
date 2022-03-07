import React, { useRef, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, Grid, Button } from "@mui/material"

export const ImportCA = () => {
    const [caName, setCaName] = useState("")
    const [ttlValue, setTtlValue] = useState(365) 
    const [ttlUnit, setTtlUnit] = useState(24)//24 = days | 24*365 = years 
    const [caCert, setCaCert] = useState("")
    const [cakey, setCaKey] = useState("")

    const inputFileRef = useRef(null);
    const inputFileRef2 = useRef(null);

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
    

    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <TextField autoFocus variant="standard" id="caName" label="CA Name" fullWidth value={caName} onChange={(ev)=>{setCaName(ev.target.value)}} />
            </Grid>
            <Grid item xs={6} container spacing={2}>
                <Grid item xs={6} container>
                    <TextField variant="standard" id="ttl" label="Emmited certificates expiration time" type="number" fullWidth value={ttlValue} onChange={ev=>{setTtlValue(ev.target.value)}}/>
                </Grid>
                <Grid item xs={6} container>
                    <FormControl fullWidth variant="standard">
                    <InputLabel id="key-type-label" >Emmited certificates expiration time units</InputLabel>
                        <Select
                            labelId="ttl-unit-label"
                            value={ttlUnit}
                            onChange={ev=>{setTtlUnit(ev.target.value)}}
                        >
                            <MenuItem value={1}>Hours</MenuItem>
                            <MenuItem value={24}>Days</MenuItem>
                            <MenuItem value={24*365}>Years</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={6} container justifyContent={"center"} alignItems="center" spacing={4}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Certificate content"
                        multiline
                        rows={15}
                        inputProps={{style: {fontSize: 12, fontFamily: "monospace"}}}
                        variant="outlined"
                        fullWidth
                        value={caCert}
                        onChange={(ev)=>{setCaCert(ev.target.value)}}
                    />
                </Grid>
            </Grid>
            <Grid item xs={6} container justifyContent={"center"} alignItems="center" spacing={4}>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Private key content"
                        multiline
                        rows={15}
                        inputProps={{style: {fontSize: 12, fontFamily: "monospace"}}}
                        variant="outlined"
                        fullWidth
                        value={cakey}
                        onChange={(ev)=>{setCaKey(ev.target.value)}}
                    />
                </Grid>
            </Grid>
            <Grid item container>
                <Button variant="contained">Import CA</Button>
            </Grid>
        </Grid>
    )
}