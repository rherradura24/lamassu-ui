import React from "react"
import { useTheme } from "@emotion/react"

export const AwsIcon = ({style={}, props}) => {
    const theme = useTheme()
    return (
        theme.palette.mode == "light" ? (
            <img src={process.env.PUBLIC_URL + "/assets/AWS.png"} height={25} style={{marginRight: "10px", marginLeft: "5px", ...style}} {...props}/>
        ) : (
            <img src={process.env.PUBLIC_URL + "/assets/AWS_WHITE.png"} height={25} style={{marginRight: "10px", marginLeft: "5px", ...style}} {...props}/>
        )
    )
}

export const AzureIcon = ({style={}, props}) => {
    return (
        <img src={process.env.PUBLIC_URL + "/assets/AZURE.png"} height={25} style={{marginRight: "10px", marginLeft: "5px", ...style}} {...props}/>
    )
}

export const GoogleCloudIcon = ({style={}, props}) => {
    return (
        <img src={process.env.PUBLIC_URL + "/assets/GCLOUD.png"} height={25} style={{marginRight: "10px", marginLeft: "5px", ...style}} {...props}/>
    )
}