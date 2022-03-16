import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Bar as BarChart } from 'react-chartjs-2';
import {Chart, registerables } from 'chart.js'
import moment from "moment"

Chart.register(...registerables );

export const Bar = ({title, cardColor, primaryTextColor}) => {

    const cas = 4

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const now = new Date()
    const daysToShow = 14
    const numCAs=1

    var daysLabels = []
    var casDatasetData = []

    const colors =[
        // "#3F4E51",
        // "#FD625E",
        // "#3599B8",
        // "#DFBFBF",
        // "#4AC5BB",
        "#0068D1",
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

    const casData = {
        labels: daysLabels,
        datasets: casDatasetData
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
        maintainAspectRatio: false,
    
        scales: {
          x: {
            stacked: true,
            grid: {
                display:false
            },
            ticks: {
                color: primaryTextColor,
            }
        },
        y: {
            stacked: true,
            beginAtZero: true,
            ticks: {
                color: primaryTextColor,
            },
            grid: {
                display:false
            }  
          }
        }
    }


    return (
        <Box sx={{width: "calc(100% - 40px)", height: "fit-content", borderRadius: "15px", padding: "20px", bgcolor: cardColor }} component={Paper}> 
            <Typography variant="button" sx={{color: primaryTextColor, marginBottom: "20px"}}>{title}</Typography>
            <Box sx={{marginTop: "20px"}} >
                <BarChart data={casData} options={casConfig}/>
            </Box>
        </Box> 
    )
}