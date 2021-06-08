import { Box, Button, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Switch, TextField } from "@material-ui/core";
import { useRef, useState } from "react";
import { LamassuModal } from "./LamassuModal";
import { MenuSeparator } from "views/Dashboard/SidebarMenuItem";
import { Autocomplete } from "@material-ui/lab";
  
const LamassuModalDeviceCreation = ({open, handleClose, handleSub,ot}) => {
    const inputFileRef = useRef(null);

    const [deviceDMS, setDeviceDMS] = useState("")
    const [deviceAlias, setDeviceAlias] = useState("")
    const [deviceUUID, setDeviceUUID] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [org, setOrg] = useState("")
    const [orgUnit, setOrgUnit] = useState("")
    const [cn, setCN] = useState("")
    const [keyType, setKeyType] = useState("rsa")
    const [keyBits, setKeyBits] = useState(4096)

    const dmss= [
        {title: "Smart Factory", id: 1},
        {title: "IoT Fleet", id: 2},
        {title: "Data Warehouse", id: 3},
        {title: "DMS 1", id: 4},
        {title: "DMS 2", id: 5},
        {title: "DMS 3", id: 6},
    ]

    return (
        <LamassuModal 
        
            title={"Creating new Device"}
            msg={"To create a new Device, please provide the apropiate information:"}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Create Device",
                        primary: true,
                        onClick: ()=>{
                        }
                    }
                ]
            }
            formContent={
                <Box>
                    <Autocomplete
                        id="combo-box-dms"
                        options={dmss}
                        fullWidth
                        value={deviceDMS}
                        onChange={option => setDeviceDMS(option.id)}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Device Manufacturing System" fullWidth variant="standard" />}
                    />

                    <TextField autoFocus margin="dense" id="devName" label="Device Alias" fullWidth value={deviceAlias} onChange={(ev)=>{setDeviceAlias(ev.target.value)}} />
                    <TextField autoFocus margin="dense" id="devUUID" label="Device UUID" fullWidth value={deviceUUID} onChange={(ev)=>{setDeviceUUID(ev.target.value)}} />
                    <Box style={{marginTop: 20}}>
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
                    
                </Box>
            }
        />
    )
}

export {LamassuModalDeviceCreation}
