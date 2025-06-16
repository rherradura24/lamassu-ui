import { Box } from "@mui/system";
import { Chart, registerables } from "chart.js";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { Paper, Typography } from "@mui/material";
import { numberToHumanReadableString } from "utils/string-utils";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useRef } from "react";

Chart.register(...registerables);

interface PieChartProps {
    dataset: { label: string, value: number, color: string }[]
    small?: boolean
    title: string
    subtitle: string
    primaryStat: string | number
    statLabel: string
    cardColor: string
    primaryTextColor: string
    secondaryTextColor: string
    percentage?: boolean
    onClick: (ev: any) => void
}

export const PieChart: React.FC<PieChartProps> = ({ dataset, small = true, title, subtitle, primaryStat, percentage = true, statLabel, cardColor, primaryTextColor, secondaryTextColor, onClick = (ev) => { }, ...props }) => {
    const localDataset = dataset.map(dataCategory => dataCategory.value);
    const localLabels = dataset.map(dataCategory => dataCategory.label);
    const localColors = dataset.map(dataCategory => dataCategory.color);
    const chartRef = useRef();

    const data = {
        datasets: [{
            data: localDataset
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: localLabels

    };

    const options: any = {
        borderWidth: 0,
        backgroundColor: localColors,
        hoverBackgroundColor: localColors,
        hoverBorderColor: localColors,
        borderRadius: 0,
        hoverBorderWidth: 10,
        hoverBorderJoinStyle: "miter",
        layout: {
            padding: {
                left: small ? 20 : 40,
                right: small ? 20 : 40
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        maintainAspectRatio: false
    };

    return (
        <Box sx={{ width: "calc(100% - 40px)", height: "fit-content", borderRadius: "15px", padding: "20px", bgcolor: cardColor }} component={Paper} {...props}>
            <Grid container justifyContent="space-between" alignItems="start">
                <Grid xs="auto" container flexDirection="column">
                    <Grid xs="auto">
                        <Typography variant="button" fontWeight="bold" sx={{ color: primaryTextColor }}>{title}</Typography>
                    </Grid>
                    {
                        subtitle !== "" && (
                            <Grid xs="auto">
                                <Typography fontSize="13px" fontStyle="italic" sx={{ color: primaryTextColor }}>{subtitle}</Typography>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
                <Grid xs={12} sm={6} md={6} lg={8} container justifyContent="center">
                    <Box sx={{ width: small ? 200 : 300, height: small ? 200 : 300, position: "relative" }}>
                        <Pie
                            ref={chartRef}
                            data={data}
                            options={options}
                            style={{ zIndex: 10, position: "relative" }}
                            onClick={ev => { onClick(getElementAtEvent(chartRef.current!, ev)); }}
                        />
                    </Box>

                    <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <Typography
                                sx={{
                                    fontSize: "35px",
                                    fontWeight: "600",
                                    color: primaryTextColor
                                }}
                            >
                                {primaryStat}
                            </Typography>

                            { percentage && <Typography sx={{ fontSize: "22px", fontWeight: "600", color: secondaryTextColor, lineHeight: "45px", alignSelf: "end" }}>%</Typography> }

                            {/* Same line if not small */}
                            {!small && (
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: "400",
                                        textTransform: "uppercase",
                                        color: secondaryTextColor,
                                        ml: 0.5
                                    }}
                                >
                                    {statLabel}
                                </Typography>
                            )}
                        </Box>

                        {/* Break line if small */}
                        {small && (
                            <Typography
                                sx={{
                                    fontSize: "18px",
                                    fontWeight: "400",
                                    textTransform: "uppercase",
                                    color: secondaryTextColor,
                                    mt: 1
                                }}
                            >
                                {statLabel}
                            </Typography>
                        )}
                    </Box>
                </Grid>

                <Grid xs={12} sm={6} md={6} lg={4} container spacing={1} padding={"5px 20px"} sx={{ mt: { xs: 2, sm: 0 }, maxWidth: { xs: 200, sm: "100%" } }}>
                    {
                        dataset.map((dataCategory, idx) => {
                            return (
                                <Grid xs={12} md={12} lg={12} container alignItems={"center"} key={idx} paddingLeft={{ xs: "0px", sm: "20px" }} justifyContent={{ xs: "flex-start", sm: "flex-start" }} >
                                    <Box sx={{ bgcolor: dataCategory.color, height: "10px", width: "10px", borderRadius: "50%", marginRight: "5px" }} />
                                    <Typography sx={{ fontSize: "14px", color: primaryTextColor }}>
                                        {`${dataCategory.label} [${numberToHumanReadableString(dataCategory.value, ".")}]`}
                                    </Typography>
                                </Grid>
                            );
                        })
                    }
                </Grid>
            </Grid>
        </Box>
    );
};
