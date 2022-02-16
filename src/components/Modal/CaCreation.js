import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { LamassuSelect } from "components/LamassuComponents/Select";
import { LamassuTextField } from "components/LamassuComponents/TextField";
import moment from "moment";
import { useEffect, useState } from "react";
import { ModalBaseline } from "./ModalBaseline";

const LamassuModalCaCreation = ({open, handleClose, handleSubmit}) => {
    const theme = useTheme();

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
    const [keyBits, setKeyBits] = useState(4096)
    
    const disabled = caName == ""
    const now = Date.now()

    useEffect(()=>{
        if (keyType == "rsa") {
            setKeyBits(3072)
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
            label: "7680 (high)",
            value: 7680
        },
    ]

    const ecdsaOptions = [
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
        <ModalBaseline
            title={"Creating new CA"}
            msg={"To create a new CA certificate, please provide the apropiate information."}
            open={open}
            maxWidth="lg"
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
                            caTtl: parseInt(ttlValue)*ttlUnit,
                            enrollerTtl: parseInt(enrollerTtlValue)*enrollerTtlUnit,
                            keyType: keyType,
                            keyBits: parseInt(keyBits)
                        })}
                    }
                ]
            }
            formContent={
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={4}>
                        <LamassuTextField label="CA Name"/>
                    </Grid>
                    <Grid item xs={4}>
                        <LamassuSelect label="Key Type">
                            <MenuItem value="rsa">RSA</MenuItem>
                            <MenuItem value="ec">ECDSA</MenuItem>
                        </LamassuSelect>
                    </Grid>
                    <Grid item xs={4}>
                        <LamassuSelect label="Key Length">
                            {
                                keyBitsOptions.map(option =><MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)
                            }
                        </LamassuSelect>
                    </Grid>
                    <Grid item xs={4}>
                        <LamassuTextField label="Country"/>
                    </Grid>
                    <Grid item xs={4}>
                        <LamassuTextField label="State/Province"/>
                    </Grid>
                    <Grid item xs={4}>
                        <LamassuTextField label="Organization"/>
                    </Grid>
                    <Grid item xs={6}>
                        <LamassuTextField label="Organization Unit"/>
                    </Grid>
                    <Grid item xs={6}>
                        <LamassuTextField label="Common Name"/>
                    </Grid>

                    
                    <Grid item xs={12} spacing={4} container>
                        <Grid item container justify="space-between" alignItems="center" spacing={4}>
                            <Grid item xs={6}>
                                <LamassuTextField label="CA expiration time"/>
                            </Grid>
                            <Grid item xs={6}>
                                <LamassuSelect label="CA expiration time units">
                                    <MenuItem value={1}>Hours</MenuItem>
                                    <MenuItem value={24}>Days</MenuItem>
                                    <MenuItem value={24*365}>Years</MenuItem>
                                </LamassuSelect>
                            </Grid>
                        </Grid>

                        <Grid item container justify="space-between" alignItems="center" spacing={4}>
                            <Grid item xs={6}>
                                <LamassuTextField label="Emmited certificates expiration time"/>
                            </Grid>
                            <Grid item xs={6}>
                                <LamassuSelect label="Emmited certificates expiration time">
                                    <MenuItem value={1}>Hours</MenuItem>
                                    <MenuItem value={24}>Days</MenuItem>
                                    <MenuItem value={24*365}>Years</MenuItem>
                                </LamassuSelect>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            }
        />
    )
}

export {LamassuModalCaCreation}
