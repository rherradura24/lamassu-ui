import React, { useEffect, useState } from "react";

import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography, useTheme } from "@mui/material";
import { LamassuSwitch } from "components/LamassuComponents/Switch"
import { Box } from "@mui/system";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { AwsIcon, AzureIcon } from "components/CloudProviderIcons";
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import { actionType, status } from "redux/utils/constants";
import { useNavigate } from "react-router-dom";

export const CreateDms = ({ createDMS }) => {
    const theme = useTheme()

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

    const handleCreateDms = () => {
        createDMS(dmsName, country, state, city, org, orgUnit, cn, keyType, parseInt(keyBits.value))
    }

    const [dmsName, setDmsName] = useState("")
    const [country, setCountry] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [org, setOrg] = useState("")
    const [orgUnit, setOrgUnit] = useState("")
    const [cn, setCN] = useState("")
    const [keyType, setKeyType] = useState("rsa")
    const [keyBits, setKeyBits] = useState(rsaOptions[1])

    useEffect(() => {
        if (keyType == "rsa") {
            setKeyBits(rsaOptions[1])
        } else {
            setKeyBits(ecdsaOptions[1])
        }
    }, [keyType])

    const keyBitsOptions = keyType == "rsa" ? rsaOptions : ecdsaOptions

    const disabledCreateDmsButton = dmsName == "" || cn == ""

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <TextField variant="standard" fullWidth label="Device Manufacturing System Name" required value={dmsName} onChange={(ev) => setDmsName(ev.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="pk-type-simple-select-label">Private Key Type</InputLabel>
                    <Select
                        labelId="pk-type-simple-select-label"
                        id="pk-type-simple-select"
                        label="Private Key Type"
                        value={keyType}
                        onChange={(ev) => setKeyType(ev.target.value)}
                    >
                        <MenuItem value="rsa">RSA</MenuItem>
                        <MenuItem value="ec">ECDSA</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="pk-length-simple-select-label">Private Key Length</InputLabel>
                    <Select
                        labelId="pk-length-simple-select-label"
                        id="pk-length-simple-select"
                        label="Private Key Length"
                        value={keyBits.value}
                        onChange={(ev) => {
                            setKeyBits(keyBitsOptions.filter(option => option.value == ev.target.value)[0])
                        }}
                        endAdornment={
                            <InputAdornment position="end" style={{ marginRight: "25px" }}>
                                <RiShieldKeyholeLine color={keyBits ? keyBits.color : ""} />
                            </InputAdornment>
                        }
                        sx={{ color: keyBits ? keyBits.color : "" }}
                    >
                        {
                            keyBitsOptions.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Country" value={country} onChange={(ev) => setCountry(ev.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="State/Province" value={state} onChange={(ev) => setState(ev.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Locality" value={city} onChange={(ev) => setCity(ev.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <TextField variant="standard" fullWidth label="Organization" value={org} onChange={(ev) => setOrg(ev.target.value)} />
            </Grid>
            <Grid item xs={6}>
                <TextField variant="standard" fullWidth label="Organization Unit" value={orgUnit} onChange={(ev) => setOrgUnit(ev.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <TextField variant="standard" fullWidth label="Common Name" required value={cn} onChange={(ev) => setCN(ev.target.value)} />
            </Grid>

            <Grid item xs={12} spacing={4} container>
                <Grid item container justify="space-between" alignItems="center" spacing={4}>
                    <Grid item container>
                        <LoadingButton
                            variant="contained"
                            endIcon={<AddIcon />}
                            onClick={() => { handleCreateDms() }}
                            // loading={requestStatus.status == status.PENDING && requestStatus.actionType == actionType.CREATE}
                            loading={false}
                            loadingPosition="end"
                            disabled={disabledCreateDmsButton}
                        >
                            Create DMS
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}