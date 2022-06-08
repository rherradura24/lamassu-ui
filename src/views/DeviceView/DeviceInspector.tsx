import React, { useEffect, useState } from "react";
import { Button, Grid, IconButton, Menu, MenuItem, Paper, Skeleton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { DynamicIcon } from "components/IconDisplayer/DynamicIcon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import { LamassuChip } from "components/LamassuComponents/Chip";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ColoredButton } from "components/LamassuComponents/ColoredButton";
import { Link, Outlet, Route, Routes, useNavigate, useParams } from "react-router-dom";
import * as cloudProxyActions from "ducks/features/cloud-proxy/actions";
import * as cloudProxySelector from "ducks/features/cloud-proxy/reducer";
import * as devicesAction from "ducks/features/devices/actions";
import * as devicesSelector from "ducks/features/devices/reducer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import { Device, OHistoricalCertStatus } from "ducks/features/devices/models";
import { OCloudProviderHealthStatus } from "ducks/features/cloud-proxy/models";
import { Certificate } from "@fidm/x509";
import { Modal } from "components/Modal";
import { DeviceInspectorSlotList } from "./DeviceInspectorViews/DeviceInspectorSlotList";
import { DeviceInspectorSlotView } from "./DeviceInspectorViews/DeviceInspectorSlotView";

interface Props {
    deviceID: string
}

export const DeviceInspector: React.FC<Props> = ({ deviceID }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const connectorsRequestStatus = useAppSelector((state) => cloudProxySelector.getRequestStatus(state));
    const connectors = useAppSelector((state) => cloudProxySelector.getCloudConnectors(state));
    const requestStatus = useAppSelector((state) => devicesSelector.getRequestStatus(state));
    const historicalCertRequestStatus = useAppSelector((state) => devicesSelector.getHistoricalCertRequestStatus(state));
    const device = useAppSelector((state) => devicesSelector.getDevice(state, deviceID));

    const [decodedCertificate, setDecodedCertificate] = useState<Certificate | undefined>();
    const [showCertificate, setShowCertificate] = useState(false);
    const [showRevokeCertificate, setShowRevokeCertificate] = useState(false);

    let activeCertIssuer: string | undefined;
    if (device) {
        const filteredCerts = device.historicalCerts.filter(cert => cert.status === OHistoricalCertStatus.ISSUED);
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
            if (connector.status === OCloudProviderHealthStatus.Passing/* && connector.synchronized_cas.filter(syncCA => syncCA.ca_name === activeCertIssuer).length > 0 */) {
                connectorToFetch.push(connector.id);
            }
        }
        dispatch(cloudProxyActions.getCloudConnectorDeviceConfigAction.request({ connectorIDs: connectorToFetch, deviceID: deviceID }));
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

    if (requestStatus.isLoading || device !== undefined) {
        return (
            <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ padding: "20px", width: "calc(100% - 40px)", borderRadius: 0, zIndex: 10 }} component={Paper} elevation={2}>
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
                                                <MenuItem style={{ width: "100%" }} onClick={(ev) => { setShowRevokeCertificate(true); }}>Revoke Certificate</MenuItem>
                                                <MenuItem style={{ width: "100%" }} onClick={(ev) => { }} disabled>Delete Device</MenuItem>
                                            </Menu>
                                        </Grid>
                                        <Modal
                                            title="Revoke the active certificate used by this device"
                                            isOpen={showRevokeCertificate}
                                            onClose={() => { setShowRevokeCertificate(false); }}
                                            subtitle="You are about to revoke the current device cert. By revoking this certificate, the divice will no longer be able to connect to Lamassu nor any cloud porovider IoT platform"
                                            actions={
                                                <Box>
                                                    <Button variant="text" onClick={() => { setShowRevokeCertificate(false); }}>Close</Button>
                                                    <Button variant="contained" onClick={() => { dispatch(devicesAction.revokeActiveDeviceCertificateAction.request({ deviceID: deviceID })); setShowRevokeCertificate(false); }}>Revoke</Button>
                                                </Box>
                                            }
                                            content={
                                                <>
                                                    <div style={{ marginTop: 20 }}>
                                                        <Typography variant="button">Device Alias: </Typography>
                                                        <Typography variant="button" style={{ background: theme.palette.mode === "light" ? "#efefef" : "#0D1519", padding: 5, fontSize: 12 }}>{device!.alias ? device!.alias : "-"}</Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="button">Device ID: </Typography>
                                                        <Typography variant="button" style={{ background: theme.palette.mode === "light" ? "#efefef" : "#0D1519", padding: 5, fontSize: 12 }}>{deviceID}</Typography>
                                                    </div>
                                                </>
                                            }
                                        />

                                    </>
                                )
                            }
                        </Grid>
                    </Box>
                </Box>
                {
                    device !== undefined && (
                        <Routes>
                            <Route path="/" element={<Outlet />}>
                                <Route path=":slotID" element={<RoutedDeviceInspectorSlotView deviceID={deviceID} activeCertIssuer={activeCertIssuer} device={device} decodedCertificate={decodedCertificate}/>} />
                                <Route index element={
                                    <DeviceInspectorSlotList deviceID={deviceID} activeCertIssuer={activeCertIssuer} device={device} decodedCertificate={decodedCertificate} onSlotClick={(slotID: any) => {
                                        navigate(slotID);
                                    }} />
                                } />
                            </Route>
                        </Routes>
                    )
                }
            </Box>
        );
    }
    return <Typography sx={{ marginTop: "10px", fontStyle: "italic" }}>Device with ID {deviceID} does not exist</Typography>;
};

interface RoutedDeviceInspectorSlotViewProps {
    deviceID: string,
    device: Device,
    activeCertIssuer: string | undefined
    decodedCertificate: Certificate | undefined
}
const RoutedDeviceInspectorSlotView: React.FC<RoutedDeviceInspectorSlotViewProps> = ({ deviceID, activeCertIssuer, device, decodedCertificate }) => {
    const params = useParams();
    // console.log(params, location);
    return (
        <DeviceInspectorSlotView slotID={params.slotID!} deviceID={deviceID} activeCertIssuer={activeCertIssuer} device={device} decodedCertificate={decodedCertificate}/>
    );
};
