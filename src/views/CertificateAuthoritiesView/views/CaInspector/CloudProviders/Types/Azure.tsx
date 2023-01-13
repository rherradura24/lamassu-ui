/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import { Grid, Skeleton, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { AzureIcon } from "components/CloudProviderIcons";
import { useAppSelector } from "ducks/hooks";
import * as cloudProxySelector from "ducks/features/cloud-proxy/reducer";
import { AzureCloudConnector, OCloudProvider } from "ducks/features/cloud-proxy/models";
interface Props {
    caName: string
    connectorID: string
}
const Azure: React.FC<Props> = ({ caName, connectorID }) => {
    const theme = useTheme();
    const themeMode = theme.palette.mode;
    const dispatch = useDispatch();

    const requestStatus = useAppSelector((state) => cloudProxySelector.getRequestStatus(state));
    const cloudConnector = useAppSelector((state) => cloudProxySelector.getCloudConnector(state, connectorID));
    const [azureCloudConnector, setAzureCloudConnector] = useState<AzureCloudConnector>();

    useEffect(() => {
        if (cloudConnector !== undefined && cloudConnector.cloud_provider === OCloudProvider.Azure) {
            setAzureCloudConnector(new AzureCloudConnector(cloudConnector));
        }
    }, [cloudConnector]);

    return (
        <Box>
            <AzureIcon />
            <Grid container spacing={2} sx={{ marginBottom: "10px", marginTop: "5px" }}>
                {
                    azureCloudConnector === undefined
                        ? (
                            <Typography>No config</Typography>
                        )
                        : (
                            <>
                                <Grid item xs={2}>
                                    <Typography style={{ fontSize: 14 }}>Subscription ID:</Typography>
                                    <Typography style={{ fontSize: 14 }}>Resource Group:</Typography>
                                    <Typography style={{ fontSize: 14 }}>Tenant ID:</Typography>
                                    <Typography style={{ fontSize: 14 }}>DPS Endpoint:</Typography>
                                    <Typography style={{ fontSize: 14 }}>IoT Hub:</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    {
                                        requestStatus.isLoading
                                            ? (
                                                <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                            )
                                            : (
                                                <>
                                                    <Typography style={{ fontSize: 14 }}>{azureCloudConnector.configuration.subscription_id}</Typography>
                                                    <Typography style={{ fontSize: 14 }}>{azureCloudConnector.configuration.resource_group}</Typography>
                                                    <Typography style={{ fontSize: 14 }}>{azureCloudConnector.configuration.tenant_id}</Typography>
                                                    <Typography style={{ fontSize: 14 }}>{azureCloudConnector.configuration.dps_endpoint}</Typography>
                                                    <Typography style={{ fontSize: 14 }}>{azureCloudConnector.configuration.iot_hub_name}</Typography>
                                                </>
                                            )
                                    }
                                </Grid>

                            </>
                        )
                }
            </Grid>
        </Box >
    );
};

export default Azure;
