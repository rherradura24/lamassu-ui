import React from "react"
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Doughnut, Bar } from 'react-chartjs-2';
import {Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DeviceStatusChart } from "./charts/DeviceStatus";

Chart.register(...registerables );
// Chart.register(ChartDataLabels);
// Chart.register(Tooltip)
// Chart.register(CategoryScale)
// Chart.register(LinearScale)

export const Home = () => {
    
    const theme = useTheme()
    const navigate = useNavigate()

    const issuedCerts = 159
    const cas = 4
    const dmss = 2
    const devices = 52

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const now = new Date()
    const daysToShow = 14
    const numCAs=8
    const numDMSs=3

    var daysLabels = []
    var casDatasetData = []
    var dmsDatasetData = []

    const colors =[
        // "#3F4E51",
        // "#FD625E",
        // "#3599B8",
        // "#DFBFBF",
        // "#4AC5BB",
        "#606C6E",
        "#FB8281",
        "#F4D25B",
        "#808A8B",
        "#A4DDEE",
        // "#F2C80F",
        // "#5F6B6D",
        // "#8AD4EB",
        "#FE9666",
        "#A66999",
        "#01B8AA",
    ]
    
    for (let i = 0; i < daysToShow; i++) {
        var current = moment(now).subtract(daysToShow + i + 1, "days").format("DD/MM")
        daysLabels.push(current)
    }

    for (let j = 0; j < numCAs; j++) {
        var currentCAData = []
        for (let i = 0; i < daysToShow; i++) {
            currentCAData.push(getRandomInt(10, 75))
        }
        casDatasetData.push(
            {
                label: 'CA ' + (j + 1),
                data: currentCAData,
                backgroundColor: colors[j % colors.length] ,
            },
        )
    }

    for (let j = 0; j < numDMSs; j++) {
        var currentDMSData = []
        for (let i = 0; i < daysToShow; i++) {
            currentDMSData.push(getRandomInt(10, 75))
        }
        dmsDatasetData.push(
            {
                label: 'DMS ' + (j + 1),
                data: currentDMSData,
                backgroundColor: colors[j % colors.length] ,
            },
        )
    }


    const casData = {
        labels: daysLabels,
        datasets: casDatasetData
    }

    const dmsData = {
        labels: daysLabels,
        datasets: dmsDatasetData
    }

    const casConfig = {
        plugins: {
          title: {
            display: false,
          },
          legend: {
              display: false
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid: {
                display:false
            },
            ticks: {
                color: theme.palette.homeCharts.issuedCertsPerCA.text,
            }
        },
        y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
                color: theme.palette.homeCharts.issuedCertsPerCA.text,
            },
            grid: {
                display:false
            }  
          }
        }
    }

    const dmsConfig = {
        plugins: {
          title: {
            display: false,
          },
          legend: {
              display: false
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            grid: {
                display:false
            },
            ticks: {
                color: theme.palette.homeCharts.enrolledDevicesPerDMS.text,
            }
        },
        y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
                color: theme.palette.homeCharts.enrolledDevicesPerDMS.text,
            },
            grid: {
                display:false
            }  
          }
        }
    }



    return (
        <Box sx={{ padding: "30px", display: "flex"}}>
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
                        <Typography variant="h3" style={{ color: theme.palette.homeCharts.mainCard.text, fontWeight: "bold" }}>{issuedCerts}</Typography>
                        <Typography variant="h5" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 15 }}>Issued Certificates</Typography>
                    </Box>
                </Box>
                <Box style={{ marginTop: 50, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Box component={Paper} style={{
                        background: theme.palette.homeCharts.mainCard.secondary, padding: 15, width: 250, display: "flex", justifyContent: "space-between", alignItems: "center",
                        cursor: "pointer"
                    }}
                        onClick={(ev) => { ev.stopPropagation(); navigate("/cas") }}
                    >
                        <Box>
                            <Typography variant="h3" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 25 }}>{cas}</Typography>
                            <Typography variant="h5" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 15 }}>Certificate Authorities</Typography>
                        </Box>
                        <Box>
                            <Box style={{ background: "white", borderRadius: 50, width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <EqualizerRoundedIcon style={{ fontSize: 25, color: theme.palette.homeCharts.mainCard.primary }} />
                            </Box>
                        </Box>
                    </Box>
                    <Box component={Paper} style={{ marginTop: 10, background: theme.palette.homeCharts.mainCard.secondary, padding: 15, width: 250, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={(ev) => { ev.stopPropagation(); navigate("/dms") }}
                    >
                        <Box>
                            <Typography variant="h3" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 25 }}>{dmss}</Typography>
                            <Typography variant="h5" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 15 }}>Device Manufacturing Systems</Typography>
                        </Box>
                        <Box>
                            <Box style={{ background: theme.palette.homeCharts.mainCard.text, borderRadius: 50, width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <EqualizerRoundedIcon style={{ fontSize: 25, color: theme.palette.homeCharts.mainCard.primary }} />
                            </Box>
                        </Box>
                    </Box>
                    <Box component={Paper} style={{ marginTop: 10, background: theme.palette.homeCharts.mainCard.secondary, padding: 15, width: 250, display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={(ev) => { ev.stopPropagation(); navigate("/devmanager") }}>
                        <Box>
                            <Typography variant="h3" style={{ color: theme.palette.homeCharts.mainCard.text, fontSize: 25 }}>{devices}</Typography>
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

            <DeviceStatusChart />

            
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
    )
}