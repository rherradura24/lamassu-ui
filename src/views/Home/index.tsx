import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { CAStats, CryptoEngine } from "ducks/features/cas/models";
import { Chart, registerables } from "chart.js";
import { DMSStats } from "ducks/features/dmss/models";
import { DeviceStats } from "ducks/features/devices/models";
import { FetchViewer } from "components/FetchViewer";
import { useNavigate } from "react-router-dom";
import React from "react";
import apicalls from "ducks/apicalls";
import useCachedEngines from "components/cache/cachedEngines";
import { numberToHumanReadableString } from "utils/string-utils";
import HomeCard from "./HomeCard";
import { CryptoEngineViewer } from "components/CryptoEngines/CryptoEngineViewer";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import RouterOutlinedIcon from "@mui/icons-material/RouterOutlined";
import { TbCertificate } from "react-icons/tb";
import { DeviceStatusChart } from "./DeviceStatusChart";

Chart.register(...registerables);

export const Home: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { getEnginesData } = useCachedEngines();

    const iconStyle = { fontSize: 35, color: theme.palette.primary.main };

    return (
        <FetchViewer
            fetcher={() => Promise.all([
                apicalls.cas.getStats(),
                apicalls.dmss.getStats(),
                apicalls.devices.getStats(),
                getEnginesData()
            ])}
            errorPrefix={"Could not fetch CA stats"}
            renderer={(item: [CAStats, DMSStats, DeviceStats, CryptoEngine[]]) => {
                const [caStats, dmsStats, deviceStats, engines] = item;

                return (
                    <Box sx={{ height: "90vh", padding: 2, boxSizing: "border-box" }}>

                        <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1, marginBottom: 2 }}>
                            <Box sx={{ display: "flex", flex: 1, flexBasis: { xs: "100%", sm: "45%", md: "45%", lg: "20%" } }}>
                                <HomeCard
                                    value={numberToHumanReadableString(caStats.certificates.total, ".")}
                                    label="Issued Certificates"
                                    onClick={() => navigate("/cas")}
                                    icon={ <TbCertificate style={iconStyle} /> }
                                />
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, flexBasis: { xs: "100%", sm: "45%", md: "45%", lg: "20%" } }}>
                                <HomeCard
                                    value={caStats.cas.total}
                                    label="Certificate Authorities"
                                    onClick={() => navigate("/cas")}
                                    icon={ <AccountBalanceOutlinedIcon style={iconStyle} /> }
                                />
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, flexBasis: { xs: "100%", sm: "45%", md: "45%", lg: "20%" } }}>
                                <HomeCard
                                    value={numberToHumanReadableString(dmsStats.total, ".")}
                                    label="Device Manufacturing Systems"
                                    onClick={() => navigate("/dms")}
                                    icon={ <FactoryOutlinedIcon style={iconStyle} /> }
                                />
                            </Box>
                            <Box sx={{ display: "flex", flex: 1, flexBasis: { xs: "100%", sm: "45%", md: "45%", lg: "20%" } }}>
                                <HomeCard
                                    value={numberToHumanReadableString(deviceStats.total, ".")}
                                    label="Devices"
                                    onClick={() => navigate("/devices")}
                                    icon={ <RouterOutlinedIcon style={iconStyle} /> }
                                />
                            </Box>
                        </Box>

                        <Grid container spacing={2} pb={2}>

                            <Grid item xs={12} md={8} lg={8}>
                                <DeviceStatusChart deviceStats={deviceStats} />
                            </Grid>

                            <Grid item xs={12} md={4} lg={4}>
                                <Box sx={{ display: "flex" }}>
                                    <Box component={Paper} style={{
                                        borderRadius: 10,
                                        padding: 20,
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        background: theme.palette.common.white,
                                        height: "fit-content"
                                    }}
                                    >
                                        <Typography variant="button" fontWeight="bold" sx={{ color: theme.palette.common.black }}>Crypto Engines</Typography>
                                        <Grid container spacing={2} sx={{ marginTop: "5px" }}>
                                            {
                                                engines.map((engine, idx) => (
                                                    <Grid item xs={12} key={idx}>
                                                        <CryptoEngineViewer engine={engine} style={{ color: theme.palette.common.black }} />
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                );
            }}
        />
    );
};
