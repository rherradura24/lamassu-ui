import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material"
import { LamassuStatusChip } from "components/LamassuComponents/Chip"
import { LamassuTable } from "components/LamassuComponents/Table"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { AMAZON_AWS, MICROSOFT_AZURE, GOOGLE_CLOUD, DISCONNECTED, CONFIGURED } from "./constans";
import DeleteIcon from '@mui/icons-material/Delete';
import { AwsIcon, AzureIcon, GoogleCloudIcon } from "components/CloudProviderIcons";
import { useState } from "react";
import AwsCloudIntegration from "./AwsCloudIntegration";

export default () => {
    const theme = useTheme()
    const [cloudProviderDisplayInfo, setCloudProviderDisplayInfo] = useState(undefined)

    const cloudProviders = [
        {
            connectorId: "3647562", 
            connectorStatus: CONFIGURED,
            connectorAlias: {
                provider: AMAZON_AWS,
                alias: "Ikerlan AWS"
            },
            connectorDeployed: "25 June 2021",
            connectorAttached: "28 June 2021",
        },
        {
            connectorId: "7418343", 
            connectorStatus: DISCONNECTED,
            connectorAlias: {
                provider: GOOGLE_CLOUD,
                alias: "LKS GCloud"
            },
            connectorDeployed: "4 Oct 2021",
            connectorAttached: "-",
        },
        {
            connectorId: "1564241", 
            connectorStatus: CONFIGURED,
            connectorAlias: {
                provider: MICROSOFT_AZURE,
                alias: "Ikerlan Az"
            },
            connectorDeployed: "11 June 2021",
            connectorAttached: "30 June 2021",
        },
    ]


    const renderCloudProviderLogo = (cloudProvider) => {
        var image
        switch (cloudProvider) {
            case AMAZON_AWS:
                image =  <AwsIcon />
                break;
            case GOOGLE_CLOUD:
                image =  <GoogleCloudIcon />
                break;
            case MICROSOFT_AZURE:
                image =  <AzureIcon />
                break;
        
            default:
                break;
        }
        return image;
    }

    const cloudProviderTableColumns = [
        {key: "settings", title: "", align: "start", size: 1},
        {key: "connectorId", title: "Connector ID", align: "center", size: 1},
        {key: "connectorStatus", title: "Status", align: "center", size: 2},
        {key: "connectorAlias", title: "Alias", align: "center", size: 2},
        {key: "connectorAttached", title: "Attached", align: "center", size: 1},
        {key: "actions", title: "", align: "end", size: 1},
    ]

    const cloudProvidersRender = cloudProviders.map(cloudProviderItem => {
        return {
            settings: (
                <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35}}>
                    <IconButton>
                        <MoreHorizIcon fontSize={"small"}/>
                    </IconButton>
                </Box>
            ),
            connectorId: <Typography style={{fontWeight: "700", fontSize: 14, color: theme.palette.text.primary}}>#{cloudProviderItem.connectorId}</Typography>,
            connectorStatus: (
                cloudProviderItem.connectorStatus === CONFIGURED ? (
                    <LamassuStatusChip label="Configured" color="green"/>
                ) : (
                    <LamassuStatusChip label="Disconnected" color="red"/>
                )
            ),
            connectorAlias: (
                <Box>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            {renderCloudProviderLogo(cloudProviderItem.connectorAlias.provider)}
                        </Grid>
                        <Grid item>
                            <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cloudProviderItem.connectorAlias.alias}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            ),
            connectorDeployed: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center"}}>{cloudProviderItem.connectorDeployed}</Typography>,
            connectorAttached: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center"}}>{cloudProviderItem.connectorAttached}</Typography>,
            actions: (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35}}>
                                <IconButton onClick={()=>setCloudProviderDisplayInfo({type: AMAZON_AWS, cloudProviderId: cloudProviderItem.connectorId})}>
                                    <FormatAlignJustifyIcon fontSize={"small"}/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35}}>
                                <IconButton>
                                    <DeleteIcon fontSize={"small"}/>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ),
        }
    })

    const renderCloudProviderView = (type, cloudProviderId) => {
        console.log(type, cloudProviderId);
        switch (type) { 
            case AMAZON_AWS:
                return <AwsCloudIntegration />
            case GOOGLE_CLOUD:
                return <AwsCloudIntegration />
            case MICROSOFT_AZURE:
                return <AwsCloudIntegration />
            default:
                return <div>Unsuported Cloud Provider</div>
        }
    }
    console.log(cloudProviderDisplayInfo);
    return(
        cloudProviderDisplayInfo === undefined ? (
            <LamassuTable columnConf={cloudProviderTableColumns} data={cloudProvidersRender}/>
        ) : (
            renderCloudProviderView(cloudProviderDisplayInfo.type, cloudProviderDisplayInfo.cloudProviderId)
        )
    )
}