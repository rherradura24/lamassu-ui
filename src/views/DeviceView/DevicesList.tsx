import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import { Link, useNavigate } from "react-router-dom";
import { DynamicIcon } from "components/IconDisplayer/DynamicIcon";
import { LamassuChip } from "components/LamassuComponents/Chip";
import { LamassuTableWithDataController, LamassuTableWithDataControllerConfigProps, OperandTypes } from "components/LamassuComponents/Table";
import { GoLinkExternal } from "react-icons/go";
import moment from "moment";
import { Device } from "ducks/features/devices/models";
import { useDispatch } from "react-redux";
import * as devicesAction from "ducks/features/devices/actions";
import * as devicesSelector from "ducks/features/devices/reducer";
import { useAppSelector } from "ducks/hooks";
import { DeviceCard } from "./components/DeviceCard";
import deepEqual from "fast-deep-equal/es6";

export const DeviceList = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const requestStatus = useAppSelector((state) => devicesSelector.getRequestStatus(state));
    const deviceList = useAppSelector((state) => devicesSelector.getDevices(state));
    const totalDevices = useAppSelector((state) => devicesSelector.getTotalDevices(state));

    const [tableConfig, setTableConfig] = useState<LamassuTableWithDataControllerConfigProps>(
        {
            filter: {
                enabled: true,
                filters: []
            },
            sort: {
                enabled: true,
                selectedField: "id",
                selectedMode: "asc"
            },
            pagination: {
                enabled: true,
                maxItems: totalDevices,
                options: [15, 25, 50],
                selectedItemsPerPage: 15,
                selectedPage: 0
            }
        }
    );

    const refreshAction = () => dispatch(devicesAction.getDevicesAction.request({
        offset: tableConfig.pagination.selectedItemsPerPage!,
        page: tableConfig.pagination.selectedPage! + 1,
        sortField: tableConfig.sort.selectedField!,
        sortMode: tableConfig.sort.selectedMode!
    }));

    useEffect(() => {
        refreshAction();
    }, []);

    useEffect(() => {
        if (tableConfig !== undefined) {
            console.log("call ", tableConfig);
            refreshAction();
        }
    }, [tableConfig]);

    const devicesTableColumns = [
        { key: "icon", title: "", align: "start", size: 1 },
        { key: "id", dataKey: "id", title: "Device ID", query: true, type: OperandTypes.string, align: "start", size: 4 },
        { key: "alias", dataKey: "alias", title: "Alias", query: true, type: OperandTypes.string, align: "center", size: 3 },
        { key: "status", dataKey: "status", title: "Status", type: OperandTypes.enum, align: "center", size: 2 },
        { key: "creation_ts", dataKey: "creation_timestamp", title: "Creation Date", type: OperandTypes.date, align: "center", size: 2 },
        { key: "dms", dataKey: "dms_id", title: "DMS ID", type: OperandTypes.string, align: "center", size: 2 },
        { key: "key_strength", dataKey: "key_metadata.strength", title: "Key Strength", type: OperandTypes.enum, align: "center", size: 1 },
        { key: "tags", dataKey: "tags", title: "Tags", type: OperandTypes.tags, align: "center", size: 2 },
        { key: "actions", title: "", align: "end", size: 2 }
    ];

    // const dmsKeyList = {};
    // for (let i = 0; i < dmsList.length; i++) {
    //     const dms = dmsList[i];
    //     dmsKeyList[dms.id] = dms;
    // }

    const deviceRender = (device: Device) => {
        const dmsContent = device.dms_id;
        // if (dmsKeyList[device.dms_id] !== undefined) {
        //     dmsContent = dmsKeyList[device.dms_id].name;
        // }
        return {
            icon: (
                <Box component={Paper} sx={{ padding: "5px", background: device.icon_color, borderRadius: 2, width: 20, height: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <DynamicIcon icon={device.icon_name} size={16} color="#fff" />
                </Box>
            ),
            id: <Typography style={{ fontWeight: "700", fontSize: 14, color: theme.palette.text.primary }}>#{device.id}</Typography>,
            alias: <Typography style={{ fontWeight: "500", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{device.alias}</Typography>,
            status: <LamassuChip label={device.status} color={device.status_color} />,
            creation_ts: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{moment(device.creation_timestamp).format("DD/MM/YYYY HH:mm")}</Typography>,
            dms: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{dmsContent}</Typography>,
            key_strength: <LamassuChip label={device.key_metadata.strength} color={device.key_metadata.strength_color} />,
            keyprops: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{`${device.key_metadata.type} ${device.key_metadata.bits}`}</Typography>,
            tags: (
                <Grid item xs={12} container spacing={1} justifyContent="center">
                    {
                        device.tags.map((tag, idx) => (
                            <Grid item key={idx}>
                                <LamassuChip color={theme.palette.mode === "dark" ? ["#EEE", "#555"] : ["#555", "#EEEEEE"]} label={tag} compact={true} compactFontSize />
                            </Grid>
                        ))
                    }
                </Grid>
            ),
            actions: (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                                <IconButton onClick={() => navigate(device.id)}>
                                    <FormatAlignJustifyIcon fontSize={"small"} />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )
        };
    };

    const renderCardDevice = (device: Device) => {
        return (
            <Link to={device.id} style={{ textDecoration: "none" }}>
                <DeviceCard style={{ cursor: "pointer" }} device={device} />
            </Link>
        );
    };

    return (
        <Box sx={{ padding: "20px", height: "calc(100% - 40px)" }}>
            <LamassuTableWithDataController
                data={deviceList}
                columnConf={devicesTableColumns}
                renderDataItem={deviceRender}
                isLoading={requestStatus.isLoading}
                withAdd={() => { navigate("create"); }}
                emptyContentComponent={
                    <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }}>
                        <Grid item xs="auto" container justifyContent={"center"} alignItems={"center"} flexDirection="column">
                            <img src={process.env.PUBLIC_URL + "/assets/icon-iot.png"} height={150} style={{ marginBottom: "25px" }} />
                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 22, lineHeight: "24px", marginRight: "10px" }}>
                                Enroll your first IoT Device
                            </Typography>
                            <Typography>Manage the enrollment process of your devices by registering and enrolling using the EST protocol</Typography>
                            <Button
                                endIcon={<GoLinkExternal />}
                                variant="contained"
                                sx={{ marginTop: "10px", color: theme.palette.primary.main, background: theme.palette.primary.light }}
                                onClick={() => {
                                    window.open("https://github.com/lamassuiot/lamassu-compose", "_blank");
                                }}
                            >
                                Go to Device enrollment instructions
                            </Button>
                        </Grid>
                    </Grid>
                }
                config={tableConfig}

                onChange={(ev: any) => {
                    console.log(ev, tableConfig);

                    if (!deepEqual(ev, tableConfig)) {
                        setTableConfig(prev => ({ ...prev, ...ev }));
                        // refreshAction();
                    }
                }}
                withRefresh={() => { refreshAction(); }}
                cardView={{
                    enabled: true,
                    renderDataItem: renderCardDevice
                }}
                tableProps={{
                    component: Paper,
                    style: {
                        padding: "30px",
                        width: "calc(100% - 60px)"
                    }
                }}
            />
        </Box>
    );
};
