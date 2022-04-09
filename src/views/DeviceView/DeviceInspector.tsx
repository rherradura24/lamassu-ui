import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, IconButton, Menu, MenuItem, Paper, Skeleton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { DynamicIcon } from "components/IconDisplayer/DynamicIcon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import { LamassuChip, LamassuStatusChip } from "components/LamassuComponents/Chip";
import { LamassuTable } from "components/LamassuComponents/Table";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ColoredButton } from "components/LamassuComponents/ColoredButton";
import { Link } from "react-router-dom";
import * as cloudProxyActions from "ducks/features/cloud-proxy/actions";
import * as cloudProxySelector from "ducks/features/cloud-proxy/reducer";
import * as devicesAction from "ducks/features/devices/actions";
import * as devicesSelector from "ducks/features/devices/reducer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import { HistoricalCert, OHistoricalCertStatus } from "ducks/features/devices/models";
import { CloudConnector, OCloudProviderHealthStatus } from "ducks/features/cloud-proxy/models";
import { CloudProviderIcon } from "components/CloudProviderIcons";
import { Certificate } from "@fidm/x509";
import { DeviceInspectorCloudActions } from "./components/DeviceInspectorCloudActions";
import { pSBC } from "components/utils/colors";
import { Modal } from "components/Modal";
import { materialLight, materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";

interface Props {
    deviceID: string
}

export const DeviceInspector: React.FC<Props> = ({ deviceID }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const connectorsRequestStatus = useAppSelector((state) => cloudProxySelector.getRequestStatus(state));
    const connectors = useAppSelector((state) => cloudProxySelector.getCloudConnectors(state));
    const requestStatus = useAppSelector((state) => devicesSelector.getRequestStatus(state));
    const historicalCertRequestStatus = useAppSelector((state) => devicesSelector.getHistoricalCertRequestStatus(state));
    const device = useAppSelector((state) => devicesSelector.getDevice(state, deviceID));

    const [decodedCertificate, setDecodedCertificate] = useState<Certificate | undefined>();
    const [showCertificate, setShowCertificate] = useState(false);

    let activeCertIssuer: string | undefined;
    if (device) {
        const filteredCerts = device.historicalCerts.filter(cert => cert.status === OHistoricalCertStatus.ACTIVE);
        if (filteredCerts.length > 0) {
            activeCertIssuer = filteredCerts[0].issuer_name;
        }
    }

    const refreshAction = () => {
        dispatch(devicesAction.getDeviceByIDAction.request({ deviceID: deviceID }));
        dispatch(cloudProxyActions.getConnectorsAction.request());
    };

    useEffect(() => {
        refreshAction();
    }, []);

    useEffect(() => {
        const connectorToFetch = [];
        for (const connector of connectors) {
            if (connector.status === OCloudProviderHealthStatus.Passing && connector.synchronized_cas.filter(syncCA => syncCA.ca_name === activeCertIssuer).length > 0) {
                connectorToFetch.push(connector.id);
            }
        }
        dispatch(cloudProxyActions.getCloudConnectorDevicesConfigAction.request({ connectorIDs: connectorToFetch }));
    }, [connectors, activeCertIssuer]);

    useEffect(() => {
        if (device && device.current_certificate.crt) {
            const parsaedCert = Certificate.fromPEM(Buffer.from(window.atob(device.current_certificate.crt), "utf8"));
            setDecodedCertificate(parsaedCert);
        }
    }, [device]);

    const [anchorDeviceActionEl, setAnchorDeviceActionEl] = useState(null);

    const handleDeviceActionClick = (event: any) => {
        if (anchorDeviceActionEl !== event.currentTarget) {
            setAnchorDeviceActionEl(event.currentTarget);
        }
    };

    const handleDeviceActionClose = (event: any) => {
        setAnchorDeviceActionEl(null);
    };

    const certTableColumns = [
        { key: "serialNumber", title: "Serial Number", align: "start", size: 3 },
        { key: "caName", title: "CA Name", align: "center", size: 2 },
        { key: "certificateStatus", title: "Certificate Status", align: "center", size: 1 },
        { key: "issuedDate", title: "Issued Date", align: "center", size: 1 },
        { key: "revokeDate", title: "Revocation Date", align: "center", size: 1 }
    ];

    const awsDevicesCertificateTableColumn = [
        { key: "serialNumber", title: "Serial Number", align: "start", size: 3 },
        { key: "arn", title: "ARN", align: "center", size: 4 },
        { key: "status", title: "Status", align: "center", size: 1 },
        { key: "updateDate", title: "Update Date", align: "center", size: 1 },
        { key: "actions", title: "", align: "end", size: 1 }
    ];

    const connectorsTableColumns = [
        { key: "id", title: "Connector ID", align: "start", size: 3 },
        { key: "connectorType", title: "Connector Type", align: "center", size: 2 },
        { key: "connectorAlias", title: "Alias", align: "center", size: 2 },
        { key: "healthStatus", title: "Connector Health Status", align: "center", size: 1 },
        { key: "syncStatus", title: "Connector Synchronization Status", align: "center", size: 2 },
        { key: "connectorEnabled", title: "Connector Enabled", align: "center", size: 2 },
        { key: "actions", title: "", align: "end", size: 1 }
    ];

    const certificatesRenderer = (cert: HistoricalCert) => {
        return {
            serialNumber: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary }}>#{cert.serial_number}</Typography>,
            caName: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary }}>#{cert.issuer_name}</Typography>,
            certificateStatus: (
                <LamassuChip label={cert.status} color={cert.status_color} />
            ),
            issuedDate: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary }}>{moment(cert.creation_timestamp).format("DD-MM-YYYY HH:mm")}</Typography>,
            revokeDate: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary }}>
                {cert.status === OHistoricalCertStatus.REVOKED ? moment(cert.revocation_timestamp).format("DD-MM-YYYY HH:mm") : "-"}
            </Typography>
        };
    };

    const cloudConnectorsRender = (connector: CloudConnector) => {
        let enabledConnectorSync = false;
        let filteredSyncCAs: Array<any> = [];
        if (activeCertIssuer) {
            filteredSyncCAs = connector.synchronized_cas.filter(syncCA => syncCA.ca_name === activeCertIssuer);
            if (filteredSyncCAs.length > 0) {
                enabledConnectorSync = true;
            }
        }

        let awsDevice;
        const deviceIdx = connector.devices_config.map(deviceCfg => deviceCfg.device_id).indexOf(deviceID);
        if (deviceIdx >= 0) {
            awsDevice = connector.devices_config[deviceIdx];
        }

        const awsDeviceCertificatesRender = (cert: any) => {
            return {
                serialNumber: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary }}>#{cert.serial_number}</Typography>,
                arn: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary }}>#{cert.arn}</Typography>,
                certificateId: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary }}>#{cert.id}</Typography>,
                status: (
                    <LamassuChip label={cert.status} color={cert.status_color} />
                ),
                updateDate: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary }}>{moment(cert.update_date).format("DD-MM-YYYY HH:mm")}</Typography>,
                actions: <DeviceInspectorCloudActions connectorID={"connector.id"} deviceID={deviceID} />
            };
        };

        return {
            id: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary }}>#{connector.id}</Typography>,
            connectorType: (
                <Box>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <CloudProviderIcon cloudProvider={connector.cloud_provider} />
                        </Grid>
                    </Grid>
                </Box>
            ),
            connectorAlias: (
                <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary }}>{connector.name}</Typography>
            ),
            healthStatus: (
                <LamassuStatusChip label={connector.status} color={connector.status_color} />
            ),
            syncStatus: (
                <LamassuStatusChip label={enabledConnectorSync ? "Enabled" : "Disabled"} color={enabledConnectorSync ? "green" : "red"} />
            ),
            connectorEnabled: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{
                enabledConnectorSync ? moment(filteredSyncCAs[0].enabled).format("DD/MM/YYYY") : "-"
            }</Typography>,
            actions: (
                enabledConnectorSync
                    ? (
                        connector.status === "Passing" && (
                            <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                                <IconButton onClick={() => { }}>
                                    <KeyboardArrowDownIcon fontSize={"small"} />
                                </IconButton>
                            </Box>
                        )
                    )
                    : (
                        <></>
                    )
            ),
            expandedRowElement: (
                <Box sx={{ width: "calc(100% - 65px)", borderLeft: `4px solid ${theme.palette.primary.main}`, background: pSBC(theme.palette.mode === "dark" ? 0.01 : -0.03, theme.palette.background.paper), marginLeft: "20px", padding: "20px 20px 0 20px", marginBottom: "20px" }}>
                    {
                        enabledConnectorSync
                            ? (
                                connector.status === "Passing" && (
                                    awsDevice
                                        ? (
                                            <>
                                                <Box style={{ marginTop: "5px" }}>
                                                    <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>AWS Thing ID</Typography>
                                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{awsDevice.aws_id}</Typography>
                                                </Box>
                                                <Box style={{ marginTop: "5px" }}>
                                                    <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Last connection</Typography>
                                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{moment(awsDevice.last_connection).format("DD-MM-YYYY HH:mm")}</Typography>
                                                </Box>
                                                <LamassuTable columnConf={awsDevicesCertificateTableColumn} data={awsDevice.certificates} renderDataItem={awsDeviceCertificatesRender} style={{ marginTop: "10px" }} />
                                            </>

                                        )
                                        : (
                                            <Box sx={{ paddingBottom: "10px" }}>
                                                <Typography fontStyle={"italic"} fontSize="12px">{"This device has not yet connected to AWS IoT Core"}</Typography>
                                            </Box>
                                        )
                                )
                            )
                            : (
                                <Box sx={{ paddingBottom: "10px" }}>
                                    <Typography fontStyle={"italic"} fontSize="12px">{"This connector is not enabled for this device. Synchronize the device's issuer CA"}</Typography>
                                </Box>
                            )
                    }
                </Box>

            )
        };
    };

    if (requestStatus.isLoading || device !== undefined) {
        return (
            <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ padding: "20px", width: "calc(100% - 40px)", borderRadius: 0, zIndex: 1 }} component={Paper}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {
                                requestStatus.isLoading
                                    ? (
                                        <Skeleton variant="rectangular" width={"40px"} height={"40px"} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
                                    )
                                    : (
                                        <Box component={Paper} sx={{ padding: "5px", background: device!.icon_color, borderRadius: 2, width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <DynamicIcon icon={device!.icon_name} size={30} color="#fff" />
                                        </Box>
                                    )
                            }
                            <Box sx={{ marginLeft: "15px" }}>
                                {
                                    requestStatus.isLoading
                                        ? (
                                            <>
                                                <Skeleton variant="rectangular" width={"250px"} height={"30px"} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
                                                <Skeleton variant="rectangular" width={"200px"} height={"30px"} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
                                            </>
                                        )
                                        : (
                                            <>
                                                <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px" }}>{device!.alias}</Typography>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 13 }}>#{device!.id}</Typography>
                                            </>
                                        )
                                }
                            </Box>
                            <Box sx={{ marginLeft: "25px" }}>
                                <Grid item container alignItems={"center"} flexDirection="column" spacing={0}>
                                    <Grid item container>
                                        {
                                            requestStatus.isLoading
                                                ? (
                                                    <Skeleton variant="rectangular" width={"60px"} height={"20px"} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
                                                )
                                                : (
                                                    <LamassuChip label={device!.status} color={device!.status_color} />
                                                )
                                        }
                                    </Grid>
                                    <Grid item container>
                                        <Box style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
                                            {
                                                requestStatus.isLoading
                                                    ? (
                                                        <Skeleton variant="rectangular" width={"50px"} height={"20px"} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
                                                    )
                                                    : (
                                                        <>
                                                            <AccessTimeIcon style={{ color: theme.palette.text.secondary, fontSize: 15, marginRight: 5 }} />
                                                            <Typography style={{ color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13 }}>{`Creation date: ${moment(device!.creation_timestamp).format("DD/MM/YYYY")}`}</Typography>
                                                        </>
                                                    )
                                            }
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            {
                                !requestStatus.isLoading && (
                                    <>
                                        <Box sx={{ marginLeft: "55px" }}>
                                            <Grid container sx={{ width: "200px" }} spacing={0}>
                                                <Grid item container alignItems={"center"}>
                                                    <Grid item xs={6} container>
                                                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginRight: "5px" }}>Key Strength:</Typography>
                                                    </Grid>
                                                    <Grid item xs={6} container>
                                                        <LamassuChip label={device!.key_metadata.strength} color={device!.key_metadata.strength_color} />
                                                    </Grid>
                                                </Grid>
                                                <Grid item container alignItems={"center"}>
                                                    <Grid item xs={6} container>
                                                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginRight: "5px" }}>Key Properties:</Typography>
                                                    </Grid>
                                                    {
                                                        device?.key_metadata.bits && device?.key_metadata.type && (
                                                            <Grid item xs={6} container>
                                                                <Box style={{ display: "flex", alignItems: "center", marginTop: "3px" }}>
                                                                    <Typography style={{ color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginRight: "5px" }}>{`${device?.key_metadata.type.toUpperCase()} ${device?.key_metadata.bits}`}</Typography>
                                                                </Box>
                                                            </Grid>
                                                        )
                                                    }
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ marginLeft: "35px" }}>
                                            {
                                                device!.tags.length > 0
                                                    ? (
                                                        <Grid item xs={12} container spacing={1} style={{ marginTop: "1px" }}>
                                                            {
                                                                device!.tags.map((tag, idx) => (
                                                                    <Grid item key={idx}>
                                                                        <LamassuChip color={theme.palette.mode === "dark" ? ["#EEE", "#555"] : ["#555", "#EEEEEE"]} label={tag} compact={true} compactFontSize />
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </Grid>
                                                    )
                                                    : (
                                                        <Grid item xs={12} style={{ height: 37 }} />
                                                    )
                                            }
                                        </Box>
                                    </>
                                )
                            }
                        </Box>
                        <Grid container spacing={2} sx={{ width: "fit-content" }}>
                            {
                                !requestStatus.isLoading && (
                                    <>
                                        <Grid item>
                                            <IconButton style={{ backgroundColor: theme.palette.primary.light }} onClick={() => { refreshAction(); }}>
                                                <RefreshIcon style={{ color: theme.palette.primary.main }} />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <ColoredButton customtextcolor={theme.palette.text.primary} customcolor={theme.palette.gray.main} variant="contained" disableFocusRipple disableRipple endIcon={anchorDeviceActionEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={handleDeviceActionClick}>Actions</ColoredButton>
                                            <Menu
                                                style={{ marginTop: 1, width: 200, borderRadius: 0 }}
                                                id="simple-menu"
                                                anchorEl={anchorDeviceActionEl}
                                                open={Boolean(anchorDeviceActionEl)}
                                                onClose={handleDeviceActionClose}
                                            // MenuListProps={{ onMouseLeave: handleClose }}
                                            >
                                                <MenuItem component={Link} to="edit" style={{ width: "100%" }} onClick={(ev: any) => { }}>Edit</MenuItem>
                                                <MenuItem style={{ width: "100%" }} onClick={(ev) => { dispatch(devicesAction.revokeActiveDeviceCertificateAction.request({ deviceID: deviceID })); }}>Revoke Certificate</MenuItem>
                                                <MenuItem style={{ width: "100%" }} onClick={(ev) => { }} disabled>Delete Device</MenuItem>
                                            </Menu>
                                        </Grid>
                                    </>
                                )
                            }
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{ padding: "30px", flexGrow: 1, overflowY: "auto", height: "300px" }}>
                    {
                        !requestStatus.isLoading && (
                            <Grid container gap={5}>
                                <Grid item xs={3} component={Paper}>
                                    <Box sx={{ padding: "15px" }}>
                                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 18 }}>Active Certificate Details</Typography>
                                    </Box>
                                    <Divider />
                                    <Box>
                                        <Box style={{ display: "flex", flexDirection: "column", padding: "15px" }}>
                                            <Box>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>CA Name</Typography>
                                                <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{activeCertIssuer || "-"}</Typography>
                                            </Box>
                                            <Box style={{ marginTop: "10px" }}>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Certificate Serial Number</Typography>
                                                {
                                                    decodedCertificate
                                                        ? (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{device!.current_certificate.serial_number}</Typography>
                                                        )
                                                        : (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                                        )
                                                }
                                            </Box>
                                            <Box style={{ marginTop: "10px" }}>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Expires</Typography>
                                                {
                                                    decodedCertificate
                                                        ? (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{moment(decodedCertificate!.validTo).format("DD-MM-YYYY HH:mm")}</Typography>
                                                        )
                                                        : (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                                        )
                                                }
                                            </Box>
                                        </Box>
                                        <Divider />
                                        <Box style={{ display: "flex", flexDirection: "column", padding: "15px" }}>
                                            <Box style={{ marginTop: "5px" }}>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Country (C)</Typography>
                                                {
                                                    decodedCertificate
                                                        ? (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{decodedCertificate!.subject.countryName}</Typography>
                                                        )
                                                        : (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                                        )
                                                }
                                            </Box>
                                            <Box style={{ marginTop: "5px" }}>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>State (ST)</Typography>
                                                <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{decodedCertificate ? decodedCertificate!.subject.attributes.find(attr => attr.shortName === "ST")?.value : "-"}</Typography>
                                            </Box>
                                            <Box style={{ marginTop: "5px" }}>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Locality (L)</Typography>
                                                {
                                                    decodedCertificate
                                                        ? (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{decodedCertificate!.subject.localityName}</Typography>
                                                        )
                                                        : (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                                        )
                                                }
                                            </Box>
                                            <Box style={{ marginTop: "5px" }}>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Organization (O)</Typography>
                                                {
                                                    decodedCertificate
                                                        ? (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{decodedCertificate!.subject.organizationName}</Typography>
                                                        )
                                                        : (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                                        )
                                                }
                                            </Box>
                                            <Box style={{ marginTop: "5px" }}>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Organization Unit (OU)</Typography>
                                                {
                                                    decodedCertificate
                                                        ? (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{decodedCertificate!.subject.organizationalUnitName}</Typography>
                                                        )
                                                        : (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                                        )
                                                }
                                            </Box>
                                            <Box style={{ marginTop: "5px" }}>
                                                <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Common Name (CN)</Typography>
                                                {
                                                    decodedCertificate
                                                        ? (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{decodedCertificate!.subject.commonName}</Typography>
                                                        )
                                                        : (
                                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                                        )
                                                }
                                            </Box>
                                            {
                                                device!.current_certificate.crt && (
                                                    <Box style={{ marginTop: "10px" }}>
                                                        <Button variant="outlined" size="small" onClick={() => { setShowCertificate(true); }}>View Certificate</Button>
                                                        <Modal
                                                            title=""
                                                            isOpen={showCertificate}
                                                            onClose={() => { setShowCertificate(false); }}
                                                            subtitle=""
                                                            actions={
                                                                <Box>
                                                                    <Button onClick={() => { setShowCertificate(false); }}>Close</Button>
                                                                </Box>
                                                            }
                                                            content={
                                                                <SyntaxHighlighter language="json" style={theme.palette.mode === "light" ? materialLight : materialOceanic} customStyle={{ fontSize: 10, padding: 20, borderRadius: 10, width: "fit-content", height: "fit-content" }} wrapLines={true} lineProps={{ style: { color: theme.palette.text.primaryLight } }}>
                                                                    {window.atob(device!.current_certificate.crt)}
                                                                </SyntaxHighlighter>
                                                            }
                                                        />
                                                    </Box>
                                                )
                                            }
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item xs component={Paper}>
                                    <Box sx={{ padding: "15px" }}>
                                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 18 }}>Certificates</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ height: "100%", padding: "20px" }}>
                                        {
                                            historicalCertRequestStatus.isLoading
                                                ? (
                                                    <>
                                                        <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                                        <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                                        <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                                    </>
                                                )
                                                : (
                                                    <LamassuTable columnConf={certTableColumns} data={device!.historicalCerts} renderDataItem={certificatesRenderer} />
                                                )
                                        }
                                    </Box>
                                </Grid>

                                <Grid item xs={12} component={Paper}>
                                    <Box sx={{ padding: "15px" }}>
                                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 18 }}>Cloud Connectors</Typography>
                                    </Box>
                                    <Divider />
                                    <Box sx={{ height: "calc(100% - 40px)", padding: "20px" }}>
                                        {
                                            connectorsRequestStatus.isLoading || historicalCertRequestStatus.isLoading
                                                ? (
                                                    <>
                                                        <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                                        <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                                        <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                                    </>
                                                )
                                                : (
                                                    <LamassuTable columnConf={connectorsTableColumns} data={connectors} renderDataItem={cloudConnectorsRender} enableRowExpand={true} />
                                                )
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                        )
                    }
                </Box>
            </Box>
        );
    }
    return <Typography sx={{ marginTop: "10px", fontStyle: "italic" }}>Device with ID {deviceID} does not exist</Typography>;
};
