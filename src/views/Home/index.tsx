import React, { useEffect } from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";
import { useNavigate } from "react-router-dom";
import { Chart, registerables } from "chart.js";
import { DeviceStatusChart } from "./charts/DeviceStatus";
import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";

import * as devicesAction from "ducks/features/devices/actions";
import * as devicesSelector from "ducks/features/devices/reducer";
import * as caAction from "ducks/features/cas/actions";
import * as caSelector from "ducks/features/cas/reducer";
import * as dmsEnrollerAction from "ducks/features/dms-enroller/actions";
import * as dmsEnrollerSelector from "ducks/features/dms-enroller/reducer";
import { numberToHumanReadableString } from "components/utils/NumberToHumanReadableString";

Chart.register(...registerables);

export const Home = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const caStats = useAppSelector((state) => caSelector.getStats(state));
    const devices = useAppSelector((state) => devicesSelector.getTotalDevices(state));
    const totalCAs = useAppSelector((state) => caSelector.getTotalCAs(state));
    const dmsList = useAppSelector((state) => dmsEnrollerSelector.getDMSs(state));

    const devicesRequestStatus = useAppSelector((state) => devicesSelector.getRequestStatus(state));
    const caRequestStatus = useAppSelector((state) => caSelector.getRequestStatus(state));
    const dmsRequestStatus = useAppSelector((state) => dmsEnrollerSelector.getRequestStatus(state));

    const refreshAction = () => {
        dispatch(caAction.getStatsAction.request());
        dispatch(caAction.getCAsAction.request({
            filterQuery: [],
            limit: 10,
            offset: 0,
            sortField: "name",
            sortMode: "asc"
        }));
        dispatch(devicesAction.getStatsAction.request({ force: false }));
        dispatch(devicesAction.getDevicesAction.request({ offset: 0, limit: 10, sortField: "id", sortMode: "asc", filterQuery: [] }));
        dispatch(dmsEnrollerAction.getDMSListAction.request({
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

    const issuedCerts = caStats.issued_certificates;
    const cas = totalCAs;
    const dmss = dmsList.length;

    function getRandomInt (min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const now = new Date();

    return (
        <Box sx={{ padding: "30px", display: "flex" }}>
            <Box component={Paper} style={{
                borderRadius: 10,
                padding: 20,
                width: 300,
                height: 550,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background: theme.palette.homeCharts.mainCard.primary,
                cursor: "pointer"
            }}
            onClick={() => navigate("/cas")}
            >
                <Box>
                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Box style={{ background: theme.palette.homeCharts.mainCard.text, borderRadius: 50, width: 50, height: 50, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ListAltOutlinedIcon style={{ fontSize: 30, color: theme.palette.homeCharts.mainCard.primary }} />
                        </Box>
                    </Box>
                    <Box style={{ marginTop: 20, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }} >
                        <Typography variant="h3" style={{ color: theme.palette.homeCharts.mainCard.text, fontWeight: "bold" }}>{numberToHumanReadableString(issuedCerts, ".")}</Typography>
                        <Typography variant="h5" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 15 }}>Issued Certificates</Typography>
                    </Box>
                </Box>
                <Box style={{ marginTop: 50, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Box component={Paper} style={{
                        background: theme.palette.homeCharts.mainCard.secondary,
                        padding: 15,
                        width: 250,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer"
                    }}
                    onClick={(ev: any) => { ev.stopPropagation(); navigate("/cas"); }}
                    >
                        <Box>
                            <Typography variant="h3" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 25 }}>{caRequestStatus.isLoading ? "-" : numberToHumanReadableString(cas, ".")}</Typography>
                            <Typography variant="h5" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 15 }}>Certificate Authorities</Typography>
                        </Box>
                        <Box>
                            <Box style={{ background: "white", borderRadius: 50, width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <EqualizerRoundedIcon style={{ fontSize: 25, color: theme.palette.homeCharts.mainCard.primary }} />
                            </Box>
                        </Box>
                    </Box>
                    <Box component={Paper} style={{ marginTop: 10, background: theme.palette.homeCharts.mainCard.secondary, padding: 15, width: 250, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={(ev: any) => { ev.stopPropagation(); navigate("/dms"); }}
                    >
                        <Box>
                            <Typography variant="h3" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 25 }}>{dmsRequestStatus.isLoading ? "-" : numberToHumanReadableString(dmss, ".")}</Typography>
                            <Typography variant="h5" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 15 }}>Device Manufacturing Systems</Typography>
                        </Box>
                        <Box>
                            <Box style={{ background: theme.palette.homeCharts.mainCard.text, borderRadius: 50, width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <EqualizerRoundedIcon style={{ fontSize: 25, color: theme.palette.homeCharts.mainCard.primary }} />
                            </Box>
                        </Box>
                    </Box>
                    <Box component={Paper} style={{ marginTop: 10, background: theme.palette.homeCharts.mainCard.secondary, padding: 15, width: 250, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={(ev: any) => { ev.stopPropagation(); navigate("/devmanager"); }}>
                        <Box>
                            <Typography variant="h3" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 25 }}>{devicesRequestStatus.isLoading ? "-" : numberToHumanReadableString(devices, ".")}</Typography>
                            <Typography variant="h5" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 15 }}>Devices</Typography>
                        </Box>
                        <Box>
                            <Box style={{ background: "white", borderRadius: 50, width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <EqualizerRoundedIcon style={{ fontSize: 25, color: theme.palette.homeCharts.mainCard.primary }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <DeviceStatusChart style={{ marginLeft: "20px" }} />

            {/* <Box sx={{display: "flex", flexWrap: "wrap"}}>
                <Box sx={{marginBottom: "20px", width: "550px", height: "fit-content", borderRadius: "15px", padding: "20px", marginLeft: "20px", bgcolor: theme.palette.homeCharts.issuedCertsPerCA.primary }} component={Paper}>
                    <Typography variant="button" sx={{color: theme.palette.homeCharts.issuedCertsPerCA.text, marginBottom: "20px"}}>Issued Certificates per CA (last 14 days)</Typography>
                    <Box sx={{marginTop: "20px"}} >
                        <Bar data={casData} options={casConfig}/>
                    </Box>
                    <Grid container spacing={1} sx={{marginTop: "20px"}}>
                        {
                            casDatasetData.map((casDataset, idx) =>{
                                return (
                                    <Grid item xs={3} container alignItems={"center"} key={casDataset.label}>
                                        <Box sx={{bgcolor: colors[idx % colors.length], height: "10px", width: "10px", borderRadius: "50%", marginRight: "5px"}}/>
                                        <Typography sx={{fontSize: "14px", color: theme.palette.homeCharts.issuedCertsPerCA.text}}>{casDataset.label}</Typography>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>

                <Box sx={{width: "550px", height: "fit-content", borderRadius: "15px", padding: "20px", marginLeft: "20px", bgcolor: theme.palette.homeCharts.enrolledDevicesPerDMS.primary }} component={Paper}>
                    <Typography variant="button" sx={{color: theme.palette.homeCharts.enrolledDevicesPerDMS.text, marginBottom: "20px"}}>Enrolled devices per DMS (last 14 days)</Typography>
                    <Box sx={{marginTop: "20px"}} >
                        <Bar data={dmsData} options={dmsConfig}/>
                    </Box>
                    <Grid container spacing={1} sx={{marginTop: "20px"}}>
                        {
                            dmsDatasetData.map((dmsDataset, idx) =>{
                                return (
                                    <Grid item xs={3} container alignItems={"center"} key={dmsDataset.label}>
                                        <Box sx={{bgcolor: colors[idx % colors.length], height: "10px", width: "10px", borderRadius: "50%", marginRight: "5px"}}/>
                                        <Typography sx={{fontSize: "14px", color: theme.palette.homeCharts.enrolledDevicesPerDMS.text}}>{dmsDataset.label}</Typography>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Box> */}

        </Box>
    );
};
