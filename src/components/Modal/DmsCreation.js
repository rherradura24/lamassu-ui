import { Box, Divider, Grid, InputLabel, Select, TextField } from "@material-ui/core";
import { useState } from "react";
import { LamassuModal } from "./LamassuModal";
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { MenuItem } from "views/dashboard/SidebarMenuItem";
  
const LamassuModalDmsCreation = ({open, handleClose, handleSubmit}) => {
    
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [org, setOrg] = useState("")
    const [orgUnit, setOrgUnit] = useState("")
    const [cn, setCN] = useState("")
    
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
                    <TextField autoFocus margin="dense" id="country" label="Country" fullWidth value={country} onChange={(ev)=>{setCountry(ev.target.value)}} />
                    <TextField margin="dense" id="state" label="State/Province" fullWidth value={state} onChange={ev=>{setState(ev.target.value)}}/>
                    <TextField margin="dense" id="city" label="City" fullWidth value={city} onChange={ev=>{setCity(ev.target.value)}}/>
                    <TextField margin="dense" id="org" label="Organization" fullWidth value={org} onChange={ev=>{setOrg(ev.target.value)}}/>
                    <TextField margin="dense" id="orgUnit" label="Organization Unit" fullWidth value={orgUnit} onChange={ev=>{setOrgUnit(ev.target.value)}}/>
                    <TextField margin="dense" id="cn" label="Common Name" fullWidth value={cn} onChange={ev=>{setCN(ev.target.value)}}/>
                    <Divider/>
                    <InputLabel id="key-encryption-algorithm-label">Age</InputLabel>
                    <Select
                        labelId="key-encryption-algorithm-label"
                    >
                            <MenuItem value={10}>Ten</MenuItem>

                        <MenuItem value={"aes256"}>AES 256 bit</MenuItem>
                        <MenuItem value={"aes192"}>AES 192 bit</MenuItem>
                        <MenuItem value={"aes128"}>AES 128 bit</MenuItem>
                        <MenuItem value={"des"}>DES</MenuItem>
                        <MenuItem value={"des3"}>TRIPLE DES</MenuItem>
                    </Select>
                </Box>
            }
        />
    )
}

export {LamassuModalDmsCreation}
