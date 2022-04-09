import { Box, Paper, Typography, useTheme } from "@material-ui/core";
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import React from 'react'
import { render } from 'react-dom'
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Bar, Line } from 'react-chartjs-2';

import {Chart} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register the plugin to all charts:
Chart.register(ChartDataLabels);

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

const Home = ({issuedCerts, cas, dmss, devices, thirtyDaysCAs, thirtyDaysDms, thirtyDaysCerts, expiringCertsTimeline, issuedCertsByDmsLastThirtyDays}) =>{

    const theme = useTheme()
    let history = useHistory();

    const main = theme.palette.homeCharts.main
    const mainText = theme.palette.homeCharts.mainText
    const mainSecondary = theme.palette.homeCharts.mainSecondary
    const casExpiring = theme.palette.homeCharts.casExpiring
    const dmssExpiring = theme.palette.homeCharts.dmssExpiring
    const devicesExpiring = theme.palette.homeCharts.devicesExpiring

    const plotTitle = theme.palette.homeCharts.plotTitle
    const plotLine = theme.palette.homeCharts.plotLine
    const plotLineDeg0 = theme.palette.homeCharts.plotLineDeg0
    const plotLineDeg1 = theme.palette.homeCharts.plotLineDeg1
    const plotToolipBg = theme.palette.homeCharts.plotToolipBg
    const plotToolipText = theme.palette.homeCharts.plotToolipText
    const plotBarChartLabelTxt = theme.palette.homeCharts.plotBarChartLabelTxt

    var data = []
    const chartLength = 30
    for (let i = chartLength -1 ; i >= 0 ; i--) {
        data.push([ moment().add(chartLength - 1 - i, "days").valueOf(), expiringCertsTimeline.filter(cert => moment(cert.valid_to).isBefore(moment().add(chartLength - 1 - i, "days"), "days") && !moment(cert.valid_to).isBefore(moment().add(chartLength - 2 - i, "days"), "days")).length])
    } 

    var issuedCertsByDMS = []
    console.log(issuedCertsByDmsLastThirtyDays);
    for (let i = 0; i < dmss.length; i++) {
        const filtered = issuedCertsByDmsLastThirtyDays.filter(dms=>dms.dms.dms_id == dmss[i].id)
        const issued = filtered.length
        console.log(dmss[i].id, issued);
        if (issued > 0) {
            console.log(dmss[i].id, issued);
            issuedCertsByDMS.push({name: dmss[i].dms_name, y: filtered[0].dms.issued_certs})
        }else{
            issuedCertsByDMS.push({name: dmss[i].dms_name, y: 0})
        }
    }

    const dataBarCharJs = {
        labels: issuedCertsByDMS.map(dms=>{return dms.name}),
        datasets: [
          {
            data: issuedCertsByDMS.map(dms=>{return dms.y}),
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: [
                "rgba("+hexToRgb(plotLineDeg0).r+","+hexToRgb(plotLineDeg0).g+","+hexToRgb(plotLineDeg0).b+", 0.3)"
            ],
            borderColor: [
                plotLineDeg1,            
            ]
          },
        ],
    };
      
    const optionsBarCharJs = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        layout: {
            padding:{
                left: 10,
                top:5,
                right: 50,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,                
            },
            tooltip:{
                enabled: false
            },
            datalabels: {
                formatter: (value, ctx) => {
                    return value
                },
                align: "end",
                anchor: "end",
                font:{
                    lineHeight: 2,
                },
                offset: 10,
                borderRadius: 5,
                padding:{
                    left: 10,
                    top:5,
                    right:10,
                    bottom:5
                },
                color: plotToolipText,
                backgroundColor: plotToolipBg        
            }
        },
        scales: {
            y: {  // not 'yAxes: [{' anymore (not an array anymore)
                ticks: {
                    color: theme.palette.homeCharts.plotBarChartLabelTxt, // not 'fontColor:' anymore
                    stepSize: 1,
                    beginAtZero: true
                },
                grid: {
                    drawBorder: false,
                    display: false
                }
            },
            x: {
                display: false,
                ticks: {
                    color: theme.palette.homeCharts.plotBarChartLabelTxt, // not 'fontColor:' anymore
                    beginAtZero: true
                },
                grid: {
                    drawBorder: false,
                    display: false
                }
            }
        }
    };

    const dataCharJs = {
        labels: data.map(dataPoint => dataPoint[0]),
        datasets: [
          {
            data: data.map(dataPoint => dataPoint[1]),
            fill: false,
            backgroundColor: plotLineDeg0,
            borderColor: plotLineDeg1,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",      
            tension: 0.4
          },
        ],
      };
      
      const optionsCharJs = {
        plugins: {
            datalabels: {
                display: false
            },
            legend: {
                display: false
            },
            tooltip:{
                displayColors: false,
                titleAlign: 'center',
                bodyAlign: 'center',
                callbacks: {
                    title: function(tooltipItem, data) {
                      return ""
                    },
                    label: function(tooltipItem, data) {
                        return tooltipItem.parsed.y +""
                    },
                    afterLabel: function(tooltipItem, data) {
                        return moment.unix(parseInt(tooltipItem.label)/1000).format("MMMM D YYYY")
                    }
                },            
            }
        },
        elements: {
            point:{
                radius: 10
            }
        },
        maintainAspectRatio: false,
        scales: {
            y: {  // not 'yAxes: [{' anymore (not an array anymore)
                display: false,
                ticks: {
                    color: theme.palette.homeCharts.plotBarChartLabelTxt, // not 'fontColor:' anymore
                    stepSize: 1,
                    beginAtZero: true
                },
                grid: {
                    drawBorder: false,
                    display: false
                }
            },
            x: {
                display: false,
                ticks: {
                    color: theme.palette.homeCharts.plotBarChartLabelTxt, // not 'fontColor:' anymore
                    beginAtZero: true
                },
                grid: {
                    drawBorder: false,
                    display: false
                }
            }
        }
      };
      

    return (
        <Box style={{padding: 20, display: "flex"}}>           
            
            <Box component={Paper} style={{borderRadius:10, padding: 20, width: 300, height:550, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                background: main, cursor: "pointer"
            }}
            onClick={()=>history.push("/ca/issued-certs")}
            >
                <Box>
                    <Box style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                        <Box style={{background: "white", borderRadius: 50, width:50, height: 50, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <ListAltOutlinedIcon style={{fontSize: 30, color: main}}/>
                        </Box>
                    </Box>
                    <Box style={{marginTop:20, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}} >
                        <Typography variant="h3" style={{color: mainText, fontWeight: "bold"}}>{issuedCerts.length}</Typography>
                        <Typography variant="h5" style={{color: "white", fontSize: 15}}>Issued Certificates</Typography>
                    </Box>
                </Box>
                <Box style={{marginTop:50, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                    <Box component={Paper} style={{background: mainSecondary, padding: 15, width: 250, display: "flex", justifyContent: "space-between", alignItems: "center",
                        cursor: "pointer"
                    }}
                    onClick={(ev)=>{ev.stopPropagation();history.push("/ca/certs")}}
                    >
                        <Box>
                            <Typography variant="h3" style={{color: mainText, fontSize: 25}}>{cas.length}</Typography>
                            <Typography variant="h5" style={{color: "#eee", fontSize: 15}}>Certificate Authorities</Typography>
                        </Box>
                        <Box>
                            <Box style={{background: "white", borderRadius: 50, width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <EqualizerRoundedIcon style={{fontSize: 25, color: main}}/>
                            </Box>
                        </Box>
                    </Box>
                    <Box component={Paper} style={{marginTop: 10, background: mainSecondary, padding: 15, width: 250, display: "flex", justifyContent: "space-between", alignItems: "center"}}
                        onClick={(ev)=>{ev.stopPropagation();history.push("/dms/list")}}
                    >
                        <Box>
                            <Typography variant="h3" style={{color: mainText, fontSize: 25}}>{dmss.length}</Typography>
                            <Typography variant="h5" style={{color: "#eee", fontSize: 15}}>Device Manufacturing Systems</Typography>
                        </Box>
                        <Box>
                            <Box style={{background: "white", borderRadius: 50, width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <EqualizerRoundedIcon style={{fontSize: 25, color: main}}/>
                            </Box>
                        </Box>
                    </Box>
                    <Box component={Paper} style={{marginTop: 10, background: mainSecondary, padding: 15, width: 250, display: "flex", justifyContent: "space-between", alignItems: "center"}}
                        onClick={(ev)=>{ev.stopPropagation();history.push("/dms/devices")}}
                    >
                        <Box>
                            <Typography variant="h3" style={{color: mainText, fontSize: 25}}>{devices.length}</Typography>
                            <Typography variant="h5" style={{color: "#eee", fontSize: 15}}>Devices</Typography>
                        </Box>
                        <Box>
                            <Box style={{background: "white", borderRadius: 50, width: 30, height: 30, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <EqualizerRoundedIcon style={{fontSize: 25, color: main}}/>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box style={{marginLeft: 20}}>
                <Box component={Paper} style={{borderRadius:10, padding: 20, width: 300, height:130, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                        background: casExpiring, cursor: "pointer"
                    }}
                    onClick={(ev)=>{ev.stopPropagation();history.push("/ca/certs")}}
                >
                    <Box>
                        <Box style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Box style={{background: "white", borderRadius: 50, width:50, height: 50, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ListAltOutlinedIcon style={{fontSize: 30, color: casExpiring}}/>
                            </Box>
                        </Box>
                        <Box style={{marginTop:20, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography variant="h3" style={{color: mainText, fontWeight: "bold"}}>{thirtyDaysCAs.length}</Typography>
                            <Typography variant="h5" style={{color: "white", fontSize: 15}}>CA certificates will expire in 30 day</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box component={Paper} style={{marginTop:20, borderRadius:10, padding: 20, width: 300, height:130, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                        background: dmssExpiring, cursor: "pointer"
                    }}
                    onClick={(ev)=>{ev.stopPropagation();history.push("/ca/issued-certs?expires=30")}}
                >
                    <Box>
                        <Box style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Box style={{background: "white", borderRadius: 50, width:50, height: 50, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ListAltOutlinedIcon style={{fontSize: 30, color: dmssExpiring}}/>
                            </Box>
                        </Box>
                        <Box style={{marginTop:20, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography variant="h3" style={{color: mainText, fontWeight: "bold"}}>{thirtyDaysDms.length}</Typography>
                            <Typography variant="h5" style={{color: "white", fontSize: 15}}>DMS certificates will expire in 30 days</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box component={Paper} style={{marginTop:20, borderRadius:10, padding: 20, width: 300, height:130, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                        background: devicesExpiring, cursor: "pointer"
                    }}
                    onClick={(ev)=>{ev.stopPropagation();history.push("/ca/issued-certs?expires=30")}}
                >
                    <Box>
                        <Box style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Box style={{background: "white", borderRadius: 50, width:50, height: 50, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ListAltOutlinedIcon style={{fontSize: 30, color: devicesExpiring}}/>
                            </Box>
                        </Box>
                        <Box style={{marginTop:20, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography variant="h3" style={{color: mainText, fontWeight: "bold"}}>{thirtyDaysCerts.length}</Typography>
                            <Typography variant="h5" style={{color: "white", fontSize: 15}}>Device certificates will expire in 30 days</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            
            <Box style={{display: "flex", flexDirection: "column"}}>
                {
                    /*
                    <Box component={Paper} style={{marginLeft: 20, height: 300, width: 600}}>
                    <Box style={{position: "relative", left: 15, top: 15}}>
                    <Typography variant="h3" style={{color: plotTitle, fontWeight: "bold", fontSize: 25}}>Activity Timeline (30 days)</Typography>
                    </Box>
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    />
                    </Box>
                    
                    <Box component={Paper} style={{marginLeft: 20, height: 25 + dmss.length*50, width: 600, marginTop: 20}}>
                    <Box style={{position: "relative", left: 15, top: 15, marginBottom:10}}>
                    <Typography variant="h3" style={{color: plotTitle, fontWeight: "bold", fontSize: 25}}>DMS Activity Timeline (30 days)</Typography>
                    </Box>
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={optionsDmsActivity}
                    />
                    </Box>
                    */
                }
                <Box component={Paper} style={{marginLeft: 20, height: 300, width: 600}}>
                    <Box style={{marginTop: 15, marginLeft: 15}}>
                        <Typography variant="h3" style={{color: plotTitle, fontWeight: "bold", fontSize: 25}}>Activity Timeline (30 days)</Typography>
                    </Box>
                    <Box style={{height: 250, width: 600}}>
                        <Line data={dataCharJs} options={optionsCharJs}/>
                    </Box>
                </Box>

                <Box component={Paper} style={{marginLeft: 20, height: 70 + dmss.length*45, width: 600, marginTop: 20}}>
                    <Box style={{marginTop: 15, marginLeft: 15}}>
                        <Typography variant="h3" style={{color: plotTitle, fontWeight: "bold", fontSize: 25}}>DMS Activity Timeline (30 days)</Typography>
                    </Box>
                    <Box style={{height: 25 + dmss.length*45, width: 600}}>
                        <Bar data={dataBarCharJs} options={optionsBarCharJs} />
                    </Box>
                </Box>

            </Box>


        </Box>
    )
}

export {Home} 