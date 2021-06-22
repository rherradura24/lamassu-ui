import { Box, Button, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Switch, TextField, Tooltip } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { LamassuModal } from "./LamassuModal";
import { MenuSeparator } from "views/Dashboard/SidebarMenuItem";
import { Autocomplete } from "@material-ui/lab";
import { createLoader } from "components/utils";
import { connect } from "react-redux";
import CachedIcon from '@material-ui/icons/Cached';

import { getAllDMS } from 'ducks/dms-enroller/Reducer';
import * as dmsActions from 'ducks/dms-enroller/Actions';
import { isObject } from "highcharts";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const LamassuModalDeviceCreation = ({open, handleClose, handleSubmit, dmsList}) => {

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
    
    useEffect(()=>{
        if (keyType == "rsa") {
            setKeyBits(4096)
        }else{
            setKeyBits(384)
        }
    }, [keyType])

    const rsaOptions = [
        {
            label: "1024 (low)",
            value: 1024
        },
        {
            label: "2048 (medium)",
            value: 2048
        },
        {
            label: "3072 (high)",
            value: 3072
        },
        {
            label: "4096 (high)",
            value: 4096
        },
    ]

    const ecdsaOptions = [
        {
            label: "160 (low)",
            value: 160
        },
        {
            label: "224 (medium)",
            value: 224
        },
        {
            label: "256 (high)",
            value: 256
        },
        {
            label: "384 (high)",
            value: 384
        },
    ]

    const keyBitsOptions = keyType == "rsa" ? rsaOptions : ecdsaOptions


    return (
        <LamassuModal 
        
            title={"Creating new Device"}
            msg={"To create a new Device, please provide the apropiate information."}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Create Device",
                        primary: true,
                        onClick: ()=>{handleSubmit(
                            {
                                uuid: deviceUUID,
                                alias: deviceAlias,
                                dmsId: deviceDMS.id,
                                country: country,
                                state: state,
                                locality: city,
                                org: org,
                                orgUnit: orgUnit,
                                commonName: cn,
                                keyType: keyType,
                                keyBits: keyBits,
                            }
                        )}
                    }
                ]
            }
            formContent={
                <Box>
                    <Autocomplete
                        id="combo-box-dms"
                        options={dmsList.filter(dms=>dms.status=="APPROVED")}
                        fullWidth
                        value={deviceDMS}
                        onChange={(event, newValue) => {
                            setDeviceDMS(newValue)
                        }}
                        getOptionLabel={(option) => isObject(option) ? option.dms_name : ""} 
                        renderInput={(params) => <TextField {...params} label="Device Manufacturing System" fullWidth variant="standard" />}
                    />

                    <TextField autoFocus margin="dense" id="devName" label="Device Alias" fullWidth value={deviceAlias} onChange={(ev)=>{setDeviceAlias(ev.target.value)}} />
                    <TextField autoFocus margin="dense" id="devUUID" label="Device UUID" fullWidth value={deviceUUID} onChange={(ev)=>{setDeviceUUID(ev.target.value)}}
                        InputProps={{endAdornment: (
                            <Tooltip title="Generate UUID">
                                <IconButton onClick={()=>{
                                    const uuid = uuidv4()
                                    setDeviceUUID(uuid)
                                }}>
                                    <CachedIcon />
                                </IconButton>
                            </Tooltip>
                        )
                            
                    }} />
                    <Box style={{marginTop: 20}}>
                        <TextField autoFocus margin="dense" id="country" label="Country" fullWidth value={country} onChange={(ev)=>{setCountry(ev.target.value)}} />
                        <TextField margin="dense" id="state" label="State/Province" fullWidth value={state} onChange={ev=>{setState(ev.target.value)}}/>
                        <TextField margin="dense" id="city" label="City" fullWidth value={city} onChange={ev=>{setCity(ev.target.value)}}/>
                        <TextField margin="dense" id="org" label="Organization" fullWidth value={org} onChange={ev=>{setOrg(ev.target.value)}}/>
                        <TextField margin="dense" id="orgUnit" label="Organization Unit" fullWidth value={orgUnit} onChange={ev=>{setOrgUnit(ev.target.value)}}/>
                        <TextField margin="dense" id="cn" label="Common Name" fullWidth value={cn} onChange={ev=>{setCN(ev.target.value)}}/>
                        <Grid container justify="space-between" alignItems="center">
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
                            <FormControl style={{width: 235}}>
                                <InputLabel id="key-type-label">Key Bits</InputLabel>
                                <Select
                                    labelId="key-bits-label"
                                    value={keyBits}
                                    onChange={ev=>{setKeyBits(ev.target.value)}}
                                    autoWidth={false}
                                    fullWidth
                                >
                                    {
                                        keyBitsOptions.map(option =><MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Box>
                    
                </Box>
            }
        />
    )
}


const mapStateToProps = (state) => ({
    dmsList : getAllDMS(state)
})
  
const mapDispatchToProps = (dispatch) => ({
    onMount: ()=>{ dispatch(dmsActions.getAllDMS()) },
})

const exported = connect(mapStateToProps, mapDispatchToProps)(createLoader(LamassuModalDeviceCreation));
export {exported as LamassuModalDeviceCreation}
