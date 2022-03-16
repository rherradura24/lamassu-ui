import {Doughnut} from "components/Charts/Doughnut"
import {Bar} from "components/Charts/Bar"
import { useTheme } from "@emotion/react";

export const IssuedCertsStatus = () => {
    const theme = useTheme()

    const dataset = [
        {
            label: "Active",
            value: 30,
            color: theme.palette.chartsColors.green
        },
        {
            label: "About to expire",
            value: 5,
            color: theme.palette.chartsColors.yellow
        },
        {
            label: "Revoked",
            value: 25,
            color: theme.palette.chartsColors.red
        },
        {
            label: "Expired",
            value: 2,
            color: theme.palette.chartsColors.purple
        }]

    return (
        <Doughnut 
            dataset={dataset} 
            title="Issued Certificates Status" 
            primaryStat={49} 
            statLabel={"Active Certificates"} 
            percentage={true} 
            cardColor={theme.palette.chartsColors.background} 
            primaryTextColor={theme.palette.chartsColors.text} 
            secondaryTextColor={theme.palette.chartsColors.text}
        />
    )
}
export const IssuedCertsKeyStrength = () => {
    const theme = useTheme()

    const dataset = [
        {
            label: "High",
            value: 57,
            color: theme.palette.chartsColors.green
        },
        {
            label: "Medium",
            value: 10,
            color: theme.palette.chartsColors.yellow
        },
        {
            label: "Low",
            value: 1,
            color: theme.palette.chartsColors.red
        }
    ]

    return (
        <Doughnut 
            dataset={dataset} 
            title="Key Strength Status" 
            primaryStat={78} 
            statLabel={"High Strength"} 
            percentage={true} 
            cardColor={theme.palette.chartsColors.background} 
            primaryTextColor={theme.palette.chartsColors.text} 
            secondaryTextColor={theme.palette.chartsColors.text}
        />
    )
}

export const IssuedCertsTimeline = () => {
    const theme = useTheme()


    return (
        <Bar title="Issued Certs" cardColor={"#eee"} primaryTextColor="#111"/>
    )
}