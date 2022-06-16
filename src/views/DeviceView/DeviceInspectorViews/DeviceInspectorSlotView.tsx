import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, IconButton, Paper, Skeleton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { LamassuChip, LamassuStatusChip } from "components/LamassuComponents/Chip";
import { LamassuTable } from "components/LamassuComponents/Table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import * as cloudProxySelector from "ducks/features/cloud-proxy/reducer";
import * as devicesSelector from "ducks/features/devices/reducer";
import * as deviceLogsSelector from "ducks/features/devices-logs/reducer";
import * as deviceLogsActions from "ducks/features/devices-logs/actions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import { Device, HistoricalCert, OHistoricalCertStatus } from "ducks/features/devices/models";
import { Certificate } from "@fidm/x509";
import { Modal } from "components/Modal";
import { materialLight, materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { TimelineOppositeContent } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AWSDeviceConfig, CloudConnector } from "ducks/features/cloud-proxy/models";
import { CloudProviderIcon } from "components/CloudProviderIcons";
import { CloudConnectorDeviceActions } from "../components/CloudConnectorDeviceActions";
import { pSBC } from "components/utils/colors";
import { useNavigate } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getColor } from "components/utils/lamassuColors";

interface Props {
    slotID: string,
    deviceID: string,
    device: Device,
    activeCertIssuer: string | undefined
    decodedCertificate: Certificate | undefined
}

export const DeviceInspectorSlotView: React.FC<Props> = ({ slotID, deviceID, device, activeCertIssuer, decodedCertificate }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const connectorsRequestStatus = useAppSelector((state) => cloudProxySelector.getRequestStatus(state));
    const connectors = useAppSelector((state) => cloudProxySelector.getCloudConnectors(state));
    const requestStatus = useAppSelector((state) => devicesSelector.getRequestStatus(state));
    const logRequestStatus = useAppSelector((state) => deviceLogsSelector.getRequestStatus(state));
    const logs = useAppSelector((state) => deviceLogsSelector.getLogs(state, deviceID));
    const historicalCertRequestStatus = useAppSelector((state) => devicesSelector.getHistoricalCertRequestStatus(state));

    const [showCertificate, setShowCertificate] = useState(false);
    const [showRevokeCertificate, setShowRevokeCertificate] = useState(false);

    const refreshAction = () => {
        dispatch(deviceLogsActions.getDeviceLogs.request({
            deviceID: deviceID,
            filterQuery: [],
            limit: 10,
            offset: 0,
            sortField: "id",
            sortMode: "asc"
        }));
    };

    useEffect(() => {
        refreshAction();
    }, []);

    console.log(device);

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
        // { key: "syncStatus", title: "Connector Synchronization Status", align: "center", size: 2 },
        // { key: "connectorEnabled", title: "Connector Enabled", align: "center", size: 2 },
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
        console.log(connector);

        const deviceIdx = connector.devices_config.map(deviceCfg => deviceCfg.device_id).indexOf(deviceID);
        if (deviceIdx >= 0) {
            awsDevice = new AWSDeviceConfig(connector.devices_config[deviceIdx].config);
        }

        const awsDeviceCertificatesRender = (cert: any) => {
            return {
                serialNumber: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary }}>#{cert.serial_number}</Typography>,
                arn: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary, overflowWrap: "anywhere" }}>#{cert.arn}</Typography>,
                certificateId: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary }}>#{cert.id}</Typography>,
                status: (
                    <LamassuChip label={cert.status} color={cert.status_color} />
                ),
                updateDate: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary }}>{moment(cert.update_date).format("DD-MM-YYYY HH:mm")}</Typography>,
                actions: <CloudConnectorDeviceActions connectorID={connector.id} deviceID={deviceID} caName={cert.ca_name} serialNumber={cert.serial_number} status={cert.status} />
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
                connector.status === "Passing" && (
                    <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                        <IconButton onClick={() => { }}>
                            <KeyboardArrowDownIcon fontSize={"small"} />
                        </IconButton>
                    </Box>
                )
            ),
            expandedRowElement: (
                <Box sx={{ width: "calc(100% - 65px)", borderLeft: `4px solid ${theme.palette.primary.main}`, background: pSBC(theme.palette.mode === "dark" ? 0.01 : -0.03, theme.palette.background.paper), marginLeft: "20px", padding: "20px 20px 0 20px", marginBottom: "20px" }}>
                    {

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
                    }
                </Box>
            )
        };
    };

    return (
        <>
            <Box sx={{ padding: "10px 20px", display: "flex", alignItems: "center", zIndex: 2 }} component={Paper} borderRadius={0}>
                <IconButton style={{ backgroundColor: theme.palette.primary.light }} onClick={() => {
                    const url = location.pathname;
                    navigate(url.substring(0, url.lastIndexOf("/")));
                }}>
                    <ArrowBackIcon style={{ color: theme.palette.primary.main }} />
                </IconButton>
                <Box sx={{ margin: "0 25px" }}>
                    <Typography variant="h5" fontWeight="500" fontSize="15px" textAlign={"center"} sx={{ color: theme.palette.text.main, background: theme.palette.background.lightContrast, width: "50px", padding: "3px 5px", borderRadius: "5px" }}>Slot {slotID}</Typography>
                </Box>
                <Grid container spacing={8}>
                    <Grid item xs="auto">
                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Expiration Date</Typography>
                        {
                            decodedCertificate
                                ? (
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{moment(decodedCertificate!.validTo).format("DD-MM-YYYY HH:mm")}</Typography>
                                )
                                : (
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                )
                        }
                    </Grid>
                    <Grid item xs="auto">
                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>CA Name</Typography>
                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{activeCertIssuer}</Typography>
                    </Grid>
                    <Grid item xs="auto">
                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Serial Number</Typography>
                        {
                            device && Object.keys(device.current_certificate).length > 0
                                ? (
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{device!.current_certificate.serial_number}</Typography>
                                )
                                : (
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                )
                        }
                    </Grid>
                    <Grid item xs="auto">
                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Key Properties</Typography>
                        {
                            device && device.key_metadata.type && device.key_metadata.bits
                                ? (
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{`${device?.key_metadata.type.toUpperCase()} ${device?.key_metadata.bits}`}</Typography>
                                )
                                : (
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                )
                        }
                    </Grid>
                    <Grid item xs="auto">
                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Key Strength</Typography>
                        {
                            device
                                ? (
                                    <LamassuChip label={device!.key_metadata.strength} color={device!.key_metadata.strength_color} compact/>
                                )
                                : (
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                )
                        }
                    </Grid>
                    <Grid item xs="auto">
                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Subject</Typography>
                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>
                            {
                                decodedCertificate
                                    ? (
                                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>
                                            {`C=${decodedCertificate!.subject.countryName}/ST=${decodedCertificate!.subject.attributes.find(attr => attr.shortName === "ST")?.value}/L=${decodedCertificate!.subject.localityName}/O=${decodedCertificate!.subject.organizationName}/OU=${decodedCertificate!.subject.organizationalUnitName}`}
                                        </Typography>
                                    )
                                    : (
                                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                    )
                            }
                        </Typography>
                    </Grid>
                    {
                        device && Object.keys(device.current_certificate).length > 0 && (
                            <Grid item xs container alignItems={"center"} justifyContent={"flex-end"}>
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
                            </Grid>

                        )
                    }
                </Grid>
            </Box>
            <Grid container sx={{ flexGrow: 1, overflowY: "hidden", height: "300px" }} columns={13}>
                <Grid item xs={10} sx={{ padding: "30px" }} container>
                    {
                        !requestStatus.isLoading && (
                            <Grid item xs={13} container gap={2}>
                                <Grid item xs={13} component={Paper}>
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

                                <Grid item xs={13} component={Paper}>
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
                </Grid>

                <Grid item xs={3} container flexDirection={"column"} component={Paper} borderRadius={0} sx={{ overflowX: "hidden", padding: "20px" }}>
                    <Grid item container justifyContent={"flex-end"}>
                        <IconButton style={{ backgroundColor: theme.palette.primary.light }} onClick={() => { refreshAction(); }}>
                            <RefreshIcon style={{ color: theme.palette.primary.main }} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        {
                            logRequestStatus.isLoading
                                ? (
                                    <>
                                        <Skeleton variant="rectangular" width={"100%"} height={20} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                        <Skeleton variant="rectangular" width={"100%"} height={20} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                        <Skeleton variant="rectangular" width={"100%"} height={20} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                    </>
                                )
                                : (
                                    <Timeline position="left" sx={{ width: "100%", marginLeft: "-20px" }}>
                                        {
                                            logs.map((log, idx) => (
                                                <TimelineItem key={idx}>
                                                    <TimelineOppositeContent style={{ maxWidth: "1px", paddingLeft: "0px", paddingRight: "0px" }} />
                                                    <TimelineSeparator>
                                                        <TimelineDot variant="outlined" sx={{ margin: 0 }} />
                                                        <TimelineConnector />
                                                    </TimelineSeparator>
                                                    <TimelineContent sx={{ marginTop: "-11.5px", marginBottom: "25px" }}>
                                                        <Typography fontWeight="500">{log.log_message}</Typography>
                                                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                            <Typography sx={{ color: theme.palette.text.secondary, marginRight: "5px" }} fontSize="13px">{moment(log.timestamp).format("DD-MM-YYYY HH:mm")}</Typography>
                                                            <Typography sx={{ color: getColor(theme, log.log_type_color)[0] }} fontSize="13px" fontWeight="500">{log.log_type}</Typography>
                                                        </Box>
                                                        <Box sx={{ marginTop: "10px" }}>
                                                            {/* <Typography sx={{ marginRight: "5px" }} fontSize="13px" fontWeight="500">
                                                        Slot A provisioned
                                                </Typography> */}
                                                            <Typography fontSize="12px">
                                                                {log.log_description}
                                                            </Typography>
                                                        </Box>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            ))
                                        }
                                    </Timeline>
                                )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};
