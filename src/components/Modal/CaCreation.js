import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { LamassuModal } from "./LamassuModal";
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  
const LamassuModalCaCreation = ({open, handleClose, handleSubmit}) => {
    
    const [caName, setCaName] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [org, setOrg] = useState("")
    const [orgUnit, setOrgUnit] = useState("")
    const [cn, setCN] = useState("")
    const [validFrom, setValidFrom] = useState(new Date(Date.now()))
    const [validTo, setValidTo] = useState(new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)))
    const [keyType, setKeyType] = useState("rsa")
    const [keyBits, setKeyBits] = useState(4096)
    
    return (
        <LamassuModal
            title={"Creating new CA"}
            msg={"To create a new CA certificate, please provide the apropiate information"}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Create CA",
                        primary: true,
                        onClick: ()=>{handleSubmit({
                            caName: caName,
                            country: country, 
                            state: state, 
                            city: city, 
                            organization: org, 
                            organizationUnit: orgUnit, 
                            commonName: cn, 
                            validFrom: validFrom, 
                            validTo: validTo,
                            keyType: keyType,
                            keyBits: parseInt(keyBits)
                        })}
                    }
                ]
            }
            formContent={
                <Box>
                    <TextField autoFocus margin="dense" id="caName" label="CA Name" fullWidth value={caName} onChange={(ev)=>{setCaName(ev.target.value)}} />
                    <TextField margin="dense" id="country" label="Country" fullWidth value={country} onChange={(ev)=>{setCountry(ev.target.value)}} />
                    <TextField margin="dense" id="state" label="State/Province" fullWidth value={state} onChange={ev=>{setState(ev.target.value)}}/>
                    <TextField margin="dense" id="city" label="City" fullWidth value={city} onChange={ev=>{setCity(ev.target.value)}}/>
                    <TextField margin="dense" id="org" label="Organization" fullWidth value={org} onChange={ev=>{setOrg(ev.target.value)}}/>
                    <TextField margin="dense" id="orgUnit" label="Organization Unit" fullWidth value={orgUnit} onChange={ev=>{setOrgUnit(ev.target.value)}}/>
                    <TextField margin="dense" id="cn" label="Common Name" fullWidth value={cn} onChange={ev=>{setCN(ev.target.value)}}/>
                    <Box>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Grid container justify="space-between">
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="DD/MM/yyyy"
                                    margin="normal"
                                    label="Valid From"
                                    value={validFrom}
                                    onChange={setValidFrom}
                                />
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="DD/MM/yyyy"
                                    margin="normal"
                                    label="Valid From"
                                    value={validTo}
                                    minDate={validFrom}
                                    onChange={setValidTo}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </Box>
                    <Grid container justify="space-between">
                        <FormControl style={{width: 235}}>
                            <InputLabel id="key-type-label">Key Type</InputLabel>
                            <Select
                                labelId="key-type-label"
                                value={keyType}
                                onChange={ev=>{setKeyType(ev.target.value)}}
                                autoWidth={false}
                                fullWidth
                            >
                                <MenuItem value="rsa">RSA</MenuItem>
                                <MenuItem value="ec">ECDSA</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField margin="dense" id="keyBits" label="Key Bits" type="number" style={{width: 235}} value={keyBits} onChange={ev=>{setKeyBits(ev.target.value)}}/>
                    </Grid>
                </Box>
            }
        />
    )
}

export {LamassuModalCaCreation}
