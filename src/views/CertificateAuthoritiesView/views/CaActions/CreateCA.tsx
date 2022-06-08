import React, { useEffect, useState } from "react";
import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { LamassuSwitch } from "components/LamassuComponents/Switch";
import { Box } from "@mui/system";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { CloudProviderIcon } from "components/CloudProviderIcons";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { LamassuTable } from "components/LamassuComponents/Table";
import { LamassuStatusChip } from "components/LamassuComponents/Chip";
import * as caSelector from "ducks/features/cas/reducer";
import * as caActions from "ducks/features/cas/actions";
import { useAppSelector } from "ducks/hooks";
import { useDispatch } from "react-redux";
import * as cloudProxyActions from "ducks/features/cloud-proxy/actions";
import * as cloudProxySelector from "ducks/features/cloud-proxy/reducer";
import { ORequestStatus, ORequestType } from "ducks/reducers_utils";
import { CloudConnector } from "ducks/features/cloud-proxy/models";

export const CreateCA = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cloudProxyRequestStatus = useAppSelector((state) => caSelector.getRequestStatus(state));
    const caRequestStatus = useAppSelector((state) => caSelector.getRequestStatus(state));
    const cloudConnectors = useAppSelector((state) => cloudProxySelector.getCloudConnectors(state)!);
    useEffect(() => {
        dispatch(cloudProxyActions.getConnectorsAction.request());
    }, []);

    const rsaOptions = [
        {
            label: "2048",
            value: 2048,
            color: theme.palette.warning.main
        },
        {
            label: "3072",
            value: 3072,
            color: theme.palette.success.main
        },
        {
            label: "7680",
            value: 7680,
            color: theme.palette.success.main
        }
    ];

    const ecdsaOptions = [
        {
            label: "224",
            value: 224,
            color: theme.palette.warning.main
        },
        {
            label: "256",
            value: 256,
            color: theme.palette.success.main
        },
        {
            label: "384",
            value: 384,
            color: theme.palette.success.main
        }
    ];

    const [selectedCloudConnectors, setSelectedCloudConnectors] = useState<Array<string>>([]);

    const [caName, setCaName] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [org, setOrg] = useState("");
    const [orgUnit, setOrgUnit] = useState("");
    const [cn, setCN] = useState("");
    const [ttlValue, setTtlValue] = useState(365);
    const [ttlUnit, setTtlUnit] = useState(24);// 24 = days | 24*365 = years
    const [enrollerTtlValue, setEnrollerTtlValue] = useState(100);
    const [enrollerTtlUnit, setEnrollerTtlUnit] = useState(24);// 24 = days | 24*365 = years
    const [keyType, setKeyType] = useState("RSA");
    const [keyBits, setKeyBits] = useState(rsaOptions[1]);

    useEffect(() => {
        setCN(caName);
    }, [caName]);

    const disabledCreateCaButton = caName === "" || cloudProxyRequestStatus.isLoading;

    const handleCreateCa = () => {
        dispatch(caActions.createCAAction.request({
            caName: caName,
            selectedConnectorIDs: selectedCloudConnectors,
            body: {
                subject: {
                    country: country,
                    state: state,
                    locality: city,
                    organization: org,
                    organization_unit: orgUnit,
                    common_name: cn
                },
                key_metadata: {
                    type: keyType,
                    bits: keyBits.value
                },
                ca_ttl: ttlValue * ttlUnit,
                enroller_ttl: enrollerTtlValue * enrollerTtlUnit
            }
        }));
    };

    useEffect(() => {
        if (keyType === "RSA") {
            setKeyBits(rsaOptions[1]);
        } else {
            setKeyBits(ecdsaOptions[1]);
        }
    }, [keyType]);

    useEffect(() => {
        if (caRequestStatus.status === ORequestStatus.Success && caRequestStatus.type === ORequestType.Create) {
            // resetCurretRequestStatus();
            navigate("/cas/" + caName);
        }
    }, [caRequestStatus]);

    const cloudConnectorsColumnConf = [
        { key: "settings", title: "", align: "start", size: 1 },
        { key: "connectorId", title: "Connector ID", align: "center", size: 2 },
        { key: "connectorStatus", title: "Status", align: "center", size: 2 },
        { key: "connectorAlias", title: "Connector Name", align: "center", size: 2 },
        { key: "connectorAttached", title: "Attached", align: "center", size: 1 }
    ];

    const cloudConnectorRender = (cloudConnector: CloudConnector) => {
        return {
            settings: (
                <LamassuSwitch value={selectedCloudConnectors.includes(cloudConnector.id)} onChange={() => {
                    setSelectedCloudConnectors(prev => {
                        if (prev.includes(cloudConnector.id)) {
                            prev.splice(prev.indexOf(cloudConnector.id), 1);
                        } else {
                            prev.push(cloudConnector.id);
                        }
                        return prev;
                    });
                }} />
            ),
            connectorId: <Typography style={{ fontWeight: "700", fontSize: 14, color: theme.palette.text.primary }}>#{cloudConnector.id}</Typography>,
            connectorStatus: (
                <LamassuStatusChip label={cloudConnector.status} color={cloudConnector.status_color} />
            ),
            connectorAlias: (
                <Box>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <CloudProviderIcon cloudProvider={cloudConnector.cloud_provider} />
                        </Grid>
                        <Grid item>
                            <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary }}>{cloudConnector.name}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            ),
            connectorAttached: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{"-"}</Typography>
        };
    };

    const keyBitsOptions = keyType === "rsa" ? rsaOptions : ecdsaOptions;

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center" >
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="CA Name" required value={caName} onChange={(ev) => setCaName(ev.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="pk-type-simple-select-label">Private Key Type</InputLabel>
                    <Select
                        labelId="pk-type-simple-select-label"
                        id="pk-type-simple-select"
                        label="Private Key Type"
                        value={keyType}
                        onChange={(ev) => setKeyType(ev.target.value)}
                    >
                        <MenuItem value="RSA">RSA</MenuItem>
                        <MenuItem value="EC">ECDSA</MenuItem>
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
                        onChange={(ev) => {
                            setKeyBits(keyBitsOptions.filter(option => option.value === ev.target.value)[0]);
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
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Organization" value={org} onChange={(ev) => setOrg(ev.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Organization Unit" value={orgUnit} onChange={(ev) => setOrgUnit(ev.target.value)} />
            </Grid>
            <Grid item xs={4}>
                <TextField variant="standard" fullWidth label="Common Name" value={cn} onChange={(ev) => setCN(ev.target.value)} disabled />
            </Grid>

            <Grid item xs={12} spacing={4} container>
                <Grid item container alignItems="center" spacing={4}>
                    <Grid item xs={6}>
                        <TextField variant="standard" type="number" fullWidth label="CA expiration time" value={ttlValue} onChange={(ev) => setTtlValue(parseInt(ev.target.value))} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="ca-exp-simple-select-label">CA expiration time units</InputLabel>
                            <Select
                                labelId="ca-exp-simple-select-label"
                                id="ca-exp-simple-select"
                                label="CA expiration time units"
                                value={ttlUnit}
                                onChange={(ev) => setTtlUnit(parseInt(ev.target.value + ""))}

                            >
                                <MenuItem value={1}>Hours</MenuItem>
                                <MenuItem value={24}>Days</MenuItem>
                                <MenuItem value={24 * 365}>Years</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item container alignItems="center" spacing={4}>
                    <Grid item xs={6}>
                        <TextField variant="standard" type="number" fullWidth label="Issuance expiration time" value={enrollerTtlValue} onChange={(ev) => setEnrollerTtlValue(parseInt(ev.target.value))} />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="ca-exp-units-simple-select-label">Issuance expiration time units</InputLabel>
                            <Select
                                labelId="ca-exp-units-simple-select-label"
                                id="ca-exp-units-simple-select"
                                label="CA expiration time units"
                                value={enrollerTtlUnit}
                                onChange={(ev) => setEnrollerTtlUnit(parseInt(ev.target.value + ""))}
                            >
                                <MenuItem value={1}>Hours</MenuItem>
                                <MenuItem value={24}>Days</MenuItem>
                                <MenuItem value={24 * 365}>Years</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item container>
                    {
                        cloudConnectors.length > 0 && (
                            <Grid item container>
                                <LamassuTable columnConf={cloudConnectorsColumnConf} data={cloudConnectors} renderDataItem={cloudConnectorRender} />
                            </Grid>
                        )
                    }
                </Grid>

                <Grid item container>
                    <LoadingButton
                        variant="contained"
                        endIcon={<AddIcon />}
                        onClick={() => { handleCreateCa(); }}
                        loading={caRequestStatus.isLoading && caRequestStatus.type === ORequestType.Create}
                        loadingPosition="end"
                        disabled={disabledCreateCaButton}
                    >
                        Create CA
                    </LoadingButton>
                </Grid>
            </Grid>
        </Grid>

    );
};
