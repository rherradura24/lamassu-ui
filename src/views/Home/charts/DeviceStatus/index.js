import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Doughnut } from 'react-chartjs-2';
import {Chart, registerables } from 'chart.js'
import { useTheme } from "@emotion/react";

Chart.register(...registerables );

export const DeviceStatusChart = () => {
    const theme = useTheme()

    const data = {
        datasets: [{
            data: [10, 30, 5, 25, 2]
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Pending enrollment',
            'Provisioned',
            'About to expire',
            'Revoked',
            'Decomissioned'
        ],

    };

    const options = {
        cutout: 95,
        borderWidth: 0,
        backgroundColor: [
            theme.palette.homeCharts.deviceStatusCard.status.pendingProvision,
            theme.palette.homeCharts.deviceStatusCard.status.provisioned,
            theme.palette.homeCharts.deviceStatusCard.status.aboutToExpire,
            theme.palette.homeCharts.deviceStatusCard.status.expired,
            theme.palette.homeCharts.deviceStatusCard.status.decommissioned
        ],
        hoverBackgroundColor: [
            theme.palette.homeCharts.deviceStatusCard.status.pendingProvision,
            theme.palette.homeCharts.deviceStatusCard.status.provisioned,
            theme.palette.homeCharts.deviceStatusCard.status.aboutToExpire,
            theme.palette.homeCharts.deviceStatusCard.status.expired,
            theme.palette.homeCharts.deviceStatusCard.status.decommissioned
        ],
        hoverBorderColor: [
            theme.palette.homeCharts.deviceStatusCard.status.pendingProvision,
            theme.palette.homeCharts.deviceStatusCard.status.provisioned,
            theme.palette.homeCharts.deviceStatusCard.status.aboutToExpire,
            theme.palette.homeCharts.deviceStatusCard.status.expired,
            theme.palette.homeCharts.deviceStatusCard.status.decommissioned
        ],
        borderRadius: 0,
        hoverBorderWidth: 10,
        hoverBorderJoinStyle: "miter",
        layout: {
            padding: {
                left: 40,
                right: 40,
            }
        }, 
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
            tooltip: {
                enabled: true
            },
        },
    }

    return (
        <Box sx={{width: "300px", height: "fit-content", borderRadius: "15px", padding: "20px", marginLeft: "20px", bgcolor: theme.palette.homeCharts.deviceStatusCard.primary }} component={Paper}> 
            <Typography variant="button" sx={{color: theme.palette.homeCharts.deviceStatusCard.text}}>Device Provisioning Status</Typography>
            <Box sx={{position: "relative", marginTop: "0px" }} >
                <Box sx={{}} >
                    <Doughnut data={data} options={options} style={{zIndex: 10, position: "relative"}}/>
                </Box>
                <Box sx={{marginTop: "-200px", marginBottom: "80px", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                    <Box style={{display: "flex", alignItems: "end"}}> 
                        <Typography sx={{fontSize: "35px", fontWeight: "600", color: theme.palette.homeCharts.deviceStatusCard.text}}>26</Typography>
                        <Typography sx={{fontSize: "22px", fontWeight: "600", color: theme.palette.homeCharts.deviceStatusCard.textSecondary, lineHeight: "45px"}}>%</Typography>
                    </Box>
                    <Typography sx={{fontSize: "18px", fontWeight: "400", width: "50%", textTransform: "uppercase", color: theme.palette.homeCharts.deviceStatusCard.textSecondary, textAlign: "center"}}>Provisioned devices</Typography>
                </Box>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6} container alignItems={"center"}>
                    <Box sx={{bgcolor: theme.palette.homeCharts.deviceStatusCard.status.pendingProvision, height: "10px", width: "10px", borderRadius: "50%", marginRight: "5px"}}/>
                    <Typography sx={{fontSize: "14px", color: theme.palette.homeCharts.deviceStatusCard.textSecondary}}>Pending enrollment</Typography>
                </Grid>
                <Grid item xs={6} container alignItems={"center"}>
                    <Box sx={{bgcolor: theme.palette.homeCharts.deviceStatusCard.status.provisioned, height: "10px", width: "10px", borderRadius: "50%", marginRight: "5px"}}/>
                    <Typography sx={{fontSize: "14px", color: theme.palette.homeCharts.deviceStatusCard.textSecondary}}>Provisioned</Typography>
                </Grid>
                <Grid item xs={6} container alignItems={"center"}>
                    <Box sx={{bgcolor: theme.palette.homeCharts.deviceStatusCard.status.aboutToExpire, height: "10px", width: "10px", borderRadius: "50%", marginRight: "5px"}}/>
                    <Typography sx={{fontSize: "14px", color: theme.palette.homeCharts.deviceStatusCard.textSecondary}}>About to expire</Typography>
                </Grid>
                <Grid item xs={6} container alignItems={"center"}>
                    <Box sx={{bgcolor: theme.palette.homeCharts.deviceStatusCard.status.expired, height: "10px", width: "10px", borderRadius: "50%", marginRight: "5px"}}/>
                    <Typography sx={{fontSize: "14px", color: theme.palette.homeCharts.deviceStatusCard.textSecondary}}>Expired/Revoked</Typography>
                </Grid>
                <Grid item xs={6} container alignItems={"center"}>
                    <Box sx={{bgcolor: theme.palette.homeCharts.deviceStatusCard.status.decommissioned, height: "10px", width: "10px", borderRadius: "50%", marginRight: "5px"}}/>
                    <Typography sx={{fontSize: "14px", color: theme.palette.homeCharts.deviceStatusCard.textSecondary}}>Decomissioned</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}