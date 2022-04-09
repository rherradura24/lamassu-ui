import React from "react";
import { CloudProvider, OCloudProvider } from "ducks/features/cloud-proxy/models";
import { useTheme } from "@mui/system";

interface Props {
  style?: any
  [x: string]: any,
}

export const AwsIcon : React.FC<Props> = ({ style = {}, props }) => {
    const theme = useTheme();
    return (
        theme.palette.mode === "light"
            ? (
                <img src={process.env.PUBLIC_URL + "/assets/AWS.png"} height={25} style={{ marginRight: "10px", marginLeft: "5px", ...style }} {...props} />
            )
            : (
                <img src={process.env.PUBLIC_URL + "/assets/AWS_WHITE.png"} height={25} style={{ marginRight: "10px", marginLeft: "5px", ...style }} {...props} />
            )
    );
};

export const AzureIcon : React.FC<Props> = ({ style = {}, props }) => {
    return (
        <img src={process.env.PUBLIC_URL + "/assets/AZURE.png"} height={25} style={{ marginRight: "10px", marginLeft: "5px", ...style }} {...props} />
    );
};

export const GoogleCloudIcon: React.FC<Props> = ({ style = {}, props }) => {
    return (
        <img src={process.env.PUBLIC_URL + "/assets/GCLOUD.png"} height={25} style={{ marginRight: "10px", marginLeft: "5px", ...style }} {...props} />
    );
};

interface CloudProviderIconProps {
  cloudProvider: CloudProvider
}

export const CloudProviderIcon: React.FC<CloudProviderIconProps> = ({ cloudProvider }) => {
    let image = <></>;
    switch (cloudProvider) {
    case OCloudProvider.Aws:
        image = <AwsIcon />;
        break;
    case OCloudProvider.GCloud:
        image = <GoogleCloudIcon />;
        break;
    case OCloudProvider.Azure:
        image = <AzureIcon />;
        break;

    default:
        break;
    }
    return image;
};
