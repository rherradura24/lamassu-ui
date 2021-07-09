import { Box, Paper, Typography, useTheme } from "@material-ui/core";
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import moment from "moment";
import { useHistory } from "react-router-dom";

const Home = ({issuedCerts, cas, dmss, devices, thirtyDaysCAs, thirtyDaysDms, thirtyDaysCerts, expiringCertsTimeline}) =>{
    const theme = useTheme()
    let history = useHistory();

    const main = theme.palette.type === "light" ? "#3F66FE" : "#23252B"
    const mainText = theme.palette.type === "light" ? "white" : "#25ee32"
    const mainSecondary = theme.palette.type === "light" ? "#5878FF" : "#414248"
    const oneDay = theme.palette.type === "light" ? "#2441B1" : "#18191D"
    const sevenDays = theme.palette.type === "light" ? "#4198D6" : "#323538"
    const thirtyDays = theme.palette.type === "light" ? "#4C98AF" : "#273133"

    const plotTitle = theme.palette.type === "light" ? "#5878FF" : "white"
    const plotLine = theme.palette.type === "light" ? "#3F66FE" : "#25ee32"
    const plotLineDeg0 = theme.palette.type === "light" ? "#2441B1" : "#305c33"
    const plotLineDeg1 = theme.palette.type === "light" ? "#dedede" : "#273133"
    const plotToolipBg = theme.palette.type === "light" ? "#3F66FE" : "#23252B"
    const plotToolipText = theme.palette.type === "light" ? "#dedede" : "#dedede"

    var data = []
    const chartLength = 30
    for (let i = 0; i < chartLength ; i++) {
        data.push([ moment().add(chartLength - 1 - i, "days").valueOf(), expiringCertsTimeline.filter(cert => moment(cert.valid_to).isBefore(moment().add(chartLength - 1 - i, "days"), "days")).length])
    } 

    const options = {
        chart:{
            backgroundColor: "transparent",
            height: 275,
            width: 600,
            margin: -5
        },
        credits:{
            enabled: false 
        },
        title: {
          text: ''
        },
        legend:{
            enabled: false
        },
        xAxis:{
            gridLineWidth: 0,
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
                enabled: false
            },
            minorTickLength: 0,
            tickLength: 0        
        },
        yAxis:{
            title: "",
            gridLineWidth: 0,
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
                enabled: false
            },
            minorTickLength: 0,
            tickLength: 0  
        },
        tooltip:{
            useHTML: true,
            borderColor: "transparent",
            backgroundColor:  plotToolipBg,
            borderRadius: 7,
            formatter: function (){
                return`
                    <div style="width: 85px; display: flex; flex-direction: column; align-items: center; justify-content:center; color: `+plotToolipText+` ;font-weight: bold; font-size: 16px; font-family: "Roboto", "Helvetica", "Arial", sans-serif; letter-spacing: 0em;">
                        <div style="margin-bottom: 5px"> 
                            `+this.y+`    
                        </div>
                        <div style="font-size: 11px; font-weight: 300;">
                            `+moment(this.x).format("DD/MM/YYYY")+`   
                        </div>
                    </div>
                `
            }

        },
        plotOptions:{
            areaspline: {
                marker:{
                    enabled: false
                },
            }
        },
        series: [{
          data: data,
          type: 'areaspline',
          color: plotLine,
          fillColor: {
            linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
            },
            stops: [
                [0, Highcharts.Color(plotLineDeg0).setOpacity(0.1).get('rgba')],
                [1, Highcharts.Color(plotLineDeg1).setOpacity(0.6).get('rgba')]
            ]
        }
        }]
    }

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
                        <Typography variant="h3" style={{color: mainText, fontWeight: "bold"}}>{issuedCerts}</Typography>
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
                            <Typography variant="h3" style={{color: mainText, fontSize: 25}}>{cas}</Typography>
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
                            <Typography variant="h3" style={{color: mainText, fontSize: 25}}>{dmss}</Typography>
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
                            <Typography variant="h3" style={{color: mainText, fontSize: 25}}>{devices}</Typography>
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
                        background: oneDay, cursor: "pointer"
                    }}
                    onClick={(ev)=>{ev.stopPropagation();history.push("/ca/certs")}}
                >
                    <Box>
                        <Box style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Box style={{background: "white", borderRadius: 50, width:50, height: 50, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ListAltOutlinedIcon style={{fontSize: 30, color: oneDay}}/>
                            </Box>
                        </Box>
                        <Box style={{marginTop:20, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography variant="h3" style={{color: mainText, fontWeight: "bold"}}>{thirtyDaysCAs}</Typography>
                            <Typography variant="h5" style={{color: "white", fontSize: 15}}>CA certificates will expire in 30 day</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box component={Paper} style={{marginTop:20, borderRadius:10, padding: 20, width: 300, height:130, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                        background: sevenDays, cursor: "pointer"
                    }}
                    onClick={(ev)=>{ev.stopPropagation();history.push("/ca/issued-certs?expires=30")}}
                >
                    <Box>
                        <Box style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Box style={{background: "white", borderRadius: 50, width:50, height: 50, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ListAltOutlinedIcon style={{fontSize: 30, color: sevenDays}}/>
                            </Box>
                        </Box>
                        <Box style={{marginTop:20, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography variant="h3" style={{color: mainText, fontWeight: "bold"}}>{thirtyDaysDms}</Typography>
                            <Typography variant="h5" style={{color: "white", fontSize: 15}}>DMS certificates will expire in 30 days</Typography>
                        </Box>
                    </Box>
                </Box>

                <Box component={Paper} style={{marginTop:20, borderRadius:10, padding: 20, width: 300, height:130, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",
                        background: thirtyDays, cursor: "pointer"
                    }}
                    onClick={(ev)=>{ev.stopPropagation();history.push("/ca/issued-certs?expires=30")}}
                >
                    <Box>
                        <Box style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Box style={{background: "white", borderRadius: 50, width:50, height: 50, display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <ListAltOutlinedIcon style={{fontSize: 30, color: thirtyDays}}/>
                            </Box>
                        </Box>
                        <Box style={{marginTop:20, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography variant="h3" style={{color: mainText, fontWeight: "bold"}}>{thirtyDaysCerts}</Typography>
                            <Typography variant="h5" style={{color: "white", fontSize: 15}}>Device certificates will expire in 30 days</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box component={Paper} style={{marginLeft: 20, height: 300, width: 600}}>
                <Box style={{position: "relative", left: 15, top: 15}}>
                    <Typography variant="h3" style={{color: plotTitle, fontWeight: "bold", fontSize: 25}}>Expiration Timeline (30 days)</Typography>
                </Box>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </Box>


        </Box>
    )
}

export {Home} 