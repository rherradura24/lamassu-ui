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
    const [ttlValue, setTtlValue] = useState(365) 
    const [ttlUnit, setTtlUnit] = useState(24)//24 = days | 24*365 = years 
    const [keyType, setKeyType] = useState("rsa")
    const [keyBits, setKeyBits] = useState(4096)
    
    const disabled = caName == ""
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
                        disabledBtn: disabled,
                        onClick: ()=>{handleSubmit({
                            caName: caName,
                            country: country, 
                            state: state, 
                            city: city, 
                            organization: org, 
                            organizationUnit: orgUnit, 
                            commonName: cn, 
                            ttl: parseInt(ttlValue)*ttlUnit+"h",
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
                    <Grid container justify="space-between" alignItems="center">
                        <TextField margin="dense" id="ttl" label="Time To Live" type="number" style={{width: 235}} value={ttlValue} onChange={ev=>{setTtlValue(ev.target.value)}}/>
                        <FormControl style={{width: 235}}>
                        <InputLabel id="key-type-label">Time To Units</InputLabel>
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
                    <Grid container justify="space-between" alignItems="center">
                        <TextField margin="dense" id="keyBits" label="Key Bits" type="number" style={{width: 235}} value={keyBits} onChange={ev=>{setKeyBits(ev.target.value)}}/>
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
                    </Grid>
                </Box>
            }
        />
    )
}

export {LamassuModalCaCreation}
