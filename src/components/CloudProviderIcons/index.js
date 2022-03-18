import React from "react"
import { useTheme } from "@emotion/react"
import { cloudProviders } from "redux/ducks/cloud-proxy/Constants"

export const AwsIcon = ({ style = {}, props }) => {
  const theme = useTheme()
  return (
    theme.palette.mode === "light"
      ? (
            <img src={process.env.PUBLIC_URL + "/assets/AWS.png"} height={25} style={{ marginRight: "10px", marginLeft: "5px", ...style }} {...props} />
        )
      : (
            <img src={process.env.PUBLIC_URL + "/assets/AWS_WHITE.png"} height={25} style={{ marginRight: "10px", marginLeft: "5px", ...style }} {...props} />
        )
  )
}

export const AzureIcon = ({ style = {}, props }) => {
  return (
        <img src={process.env.PUBLIC_URL + "/assets/AZURE.png"} height={25} style={{ marginRight: "10px", marginLeft: "5px", ...style }} {...props} />
  )
}

export const GoogleCloudIcon = ({ style = {}, props }) => {
  return (
        <img src={process.env.PUBLIC_URL + "/assets/GCLOUD.png"} height={25} style={{ marginRight: "10px", marginLeft: "5px", ...style }} {...props} />
  )
}

export const CloudProviderIcon = ({ cloudProvider }) => {
  let image
  switch (cloudProvider) {
    case cloudProviders.AWS:
      image = <AwsIcon />
      break
    case cloudProviders.GCLOUD:
      image = <GoogleCloudIcon />
      break
    case cloudProviders.AZURE:
      image = <AzureIcon />
      break

    default:
      break
  }
  return image
}
