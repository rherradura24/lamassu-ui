import React, { useEffect, useState } from "react";
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import {LamassuSwitch} from "components/LamassuComponents/Switch"
import { Box } from "@mui/system";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { AwsIcon, AzureIcon } from "components/CloudProviderIcons";

export const CreateCA = () => {
    const theme = useTheme();

    const rsaOptions = [
        {
            label: "2048",
            value: 2048,
            color: theme.palette.warning.main,
        },
        {
            label: "3072",
            value: 3072,
            color: theme.palette.success.main,
        },
        {
            label: "7680",
            value: 7680,
            color: theme.palette.success.main,
        },
    ]

    const ecdsaOptions = [
        {
            label: "224",
            value: 224,
            color: theme.palette.warning.main,
        },
        {
            label: "256",
            value: 256,
            color: theme.palette.success.main,
        },
        {
            label: "384",
            value: 384,
            color: theme.palette.success.main,
        },
    ]

    const [selectedTab, setSelectedTab] = useState(0)

    const [caName, setCaName] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [org, setOrg] = useState("")
    const [orgUnit, setOrgUnit] = useState("")
    const [cn, setCN] = useState("")
    const [ttlValue, setTtlValue] = useState(365) 
    const [ttlUnit, setTtlUnit] = useState(24)//24 = days | 24*365 = years 
    const [enrollerTtlValue, setEnrollerTtlValue] = useState(100) 
    const [enrollerTtlUnit, setEnrollerTtlUnit] = useState(24)//24 = days | 24*365 = years 
    const [keyType, setKeyType] = useState("rsa")
    const [keyBits, setKeyBits] = useState(rsaOptions[1])
    
    const disabled = caName == ""


    useEffect(()=>{
        if (keyType == "rsa") {
            setKeyBits(rsaOptions[1])
        }else{
            setKeyBits(ecdsaOptions[1])
        }
    }, [keyType])

    const keyBitsOptions = keyType == "rsa" ? rsaOptions : ecdsaOptions

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center" >
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="CA Name" value={caName} onChange={(ev)=>setCaName(ev.target.value)}/>
            </Grid>
            <Grid item xs={4}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="pk-type-simple-select-label">Private Key Type</InputLabel>
                    <Select
                        labelId="pk-type-simple-select-label"
                        id="pk-type-simple-select"
                        label="Private Key Type"
                        value={keyType} onChange={(ev)=>setKeyType(ev.target.value)}
                    >
                        <MenuItem value="rsa">RSA</MenuItem>
                        <MenuItem value="ec">ECDSA</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="pk-length-simple-select-label">Private Key Length</InputLabel>
                    <Select
                        labelId="pk-length-simple-select-label"
                        id="pk-length-simple-select"
                        label="Private Key Length"
                        value={keyBits.value}
                        onChange={(ev)=>{
                            setKeyBits(keyBitsOptions.filter(option => option.value == ev.target.value)[0])
                        }}
                        endAdornment={
                            <InputAdornment position="end" style={{marginRight: "25px"}}>
                                <RiShieldKeyholeLine color={keyBits ? keyBits.color : ""}/>
                            </InputAdornment>
                        }
                        sx={{color: keyBits ? keyBits.color : ""}}
                    >
                        {
                            keyBitsOptions.map(option =><MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Country" />
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="State/Province" />
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Locality" />
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Organization" />
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Organization Unit" />
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Common Name" />
            </Grid>

            <Grid item xs={12} spacing={4} container>
                <Grid item container justify="space-between" alignItems="center" spacing={4}>
                    <Grid item xs={6}>
                        <TextField variant="standard" fullWidth label="CA expiration time" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="ca-exp-simple-select-label">CA expiration time units</InputLabel>
                            <Select
                                labelId="ca-exp-simple-select-label"
                                id="ca-exp-simple-select"
                                label="CA expiration time units"
                            >
                                <MenuItem value={1}>Hours</MenuItem>
                                <MenuItem value={24}>Days</MenuItem>
                                <MenuItem value={24*365}>Years</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item container justify="space-between" alignItems="center" spacing={4}>
                    <Grid item xs={6}>
                        <TextField variant="standard" fullWidth label="Emmited certificates expiration time" />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="ca-exp-units-simple-select-label">Emmited certificates expiration time units</InputLabel>
                            <Select
                                labelId="ca-exp-units-simple-select-label"
                                id="ca-exp-units-simple-select"
                                label="CA expiration time units"
                            >
                                <MenuItem value={1}>Hours</MenuItem>
                                <MenuItem value={24}>Days</MenuItem>
                                <MenuItem value={24*365}>Years</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item container>
                    <Grid item container>
                        <Grid item container alignItems={"center"}>
                            <LamassuSwitch />
                            <Box sx={{width: 60, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <AwsIcon style={{height: 20}}/>
                            </Box>
                            <Typography>AWS IoT Core integration</Typography>
                        </Grid>

                        <Grid item container alignItems={"center"}>
                            <LamassuSwitch />
                            <Box sx={{width: 60, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <AzureIcon style={{height: 20}}/>
                            </Box>
                            <Typography>Azure IoT Hub integration</Typography>
                        </Grid>
                    </Grid>


                </Grid>
                    <Grid item container>
                        <Button variant="contained">Create CA</Button>
                    </Grid>
            </Grid>
        </Grid>
                        
    )
}