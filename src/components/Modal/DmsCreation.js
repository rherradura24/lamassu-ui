import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { LamassuModal } from "./LamassuModal";
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  
const LamassuModalDmsCreation = ({open, handleClose, handleSubmit}) => {

    const [dmsName, setDmsName] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [org, setOrg] = useState("")
    const [orgUnit, setOrgUnit] = useState("")
    const [cn, setCN] = useState("")
    const [keyType, setKeyType] = useState("rsa")
    const [keyBits, setKeyBits] = useState(4096)
    return (
        <LamassuModal 
        
            title={"Creating new Device Manufacturing System"}
            msg={"To create a new DMS, please provide the apropiate information"}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Create DMS",
                        primary: true,
                        onClick: ()=>{handleSubmit({
                            country: country, 
                            state: state, 
                            city: city, 
                            organization: org, 
                            organizationUnit: orgUnit, 
                            commonName: cn, 
                        })}
                    }
                ]
            }
            formContent={
                <Box>
                    <TextField autoFocus margin="dense" id="caName" label="Device manufacturing system name" fullWidth value={dmsName} onChange={(ev)=>{setDmsName(ev.target.value)}} />
                    <TextField autoFocus margin="dense" id="country" label="Country" fullWidth value={country} onChange={(ev)=>{setCountry(ev.target.value)}} />
                    <TextField margin="dense" id="state" label="State/Province" fullWidth value={state} onChange={ev=>{setState(ev.target.value)}}/>
                    <TextField margin="dense" id="city" label="City" fullWidth value={city} onChange={ev=>{setCity(ev.target.value)}}/>
                    <TextField margin="dense" id="org" label="Organization" fullWidth value={org} onChange={ev=>{setOrg(ev.target.value)}}/>
                    <TextField margin="dense" id="orgUnit" label="Organization Unit" fullWidth value={orgUnit} onChange={ev=>{setOrgUnit(ev.target.value)}}/>
                    <TextField margin="dense" id="cn" label="Common Name" fullWidth value={cn} onChange={ev=>{setCN(ev.target.value)}}/>
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

export {LamassuModalDmsCreation}
