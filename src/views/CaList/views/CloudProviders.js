import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material"
import { LamassuStatusChip } from "components/LamassuComponents/Chip"
import { LamassuTable } from "components/LamassuComponents/Table"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { AMAZON_AWS, MICROSOFT_AZURE, GOOGLE_CLOUD, DISCONNECTED, CONFIGURED } from "./constans";
import DeleteIcon from '@mui/icons-material/Delete';

export const CloudProviders = ({}) => {
    const theme = useTheme()

    const awsPolicy = {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": [
              "iot:Connect"
            ],
            "Resource": [
              "arn:aws:iot:eu-west-1:345876576284:client/${iot:Connection.Thing.ThingName}"
            ]
          },
          {
            "Effect": "Allow",
            "Action": [
              "iot:Publish",
              "iot:Receive"
            ],
            "Resource": [
              "arn:aws:iot:eu-west-1:345876576284:topic/${iot:Connection.Thing.ThingName}/*"
            ]
          },
          {
            "Effect": "Allow",
            "Action": [
              "iot:Subscribe"
            ],
            "Resource": [
              "arn:aws:iot:eu-west-1:345876576284:topicfilter/${iot:Connection.Thing.ThingName}/*"
            ]
          }
        ]
    }



    const cloudProviders = [
        {
            connectorId: "3647562", 
            connectorStatus: DISCONNECTED,
            connectorAlias: {
                provider: AMAZON_AWS,
                alias: "Ikerlan AWS"
            },
            connectorDeployed: "25 June 2021",
            connectorAttached: "28 June 2021",
        },
        {
            connectorId: "7418343", 
            connectorStatus: CONFIGURED,
            connectorAlias: {
                provider: GOOGLE_CLOUD,
                alias: "LKS GCloud"
            },
            connectorDeployed: "4 Oct 2021",
            connectorAttached: "19 OCt 2021",
        },
        {
            connectorId: "1564241", 
            connectorStatus: DISCONNECTED,
            connectorAlias: {
                provider: MICROSOFT_AZURE,
                alias: "Ikerlan Azure"
            },
            connectorDeployed: "11 June 2021",
            connectorAttached: "30 June 2021",
        },
    ]


    const renderCloudProviderLogo = (cloudProvider) => {
        var image
        switch (cloudProvider) {
            case AMAZON_AWS:
                if (theme.palette.mode === "light") {
                    image =  <img src={process.env.PUBLIC_URL + "/assets/AWS.png"} height={25} />
                }else{
                    image =  <img src={process.env.PUBLIC_URL + "/assets/AWS_WHITE.png"} height={25} />
                }
                break;
            case GOOGLE_CLOUD:
                image =  <img src={process.env.PUBLIC_URL + "/assets/GCLOUD.png"} height={25} />
                break;
            case MICROSOFT_AZURE:
                image =  <img src={process.env.PUBLIC_URL + "/assets/AZURE.png"} height={25} />
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
        {key: "connectorDeployed", title: "Installed", align: "center", size: 1},
        {key: "connectorAttached", title: "Attached", align: "center", size: 1},
        {key: "actions", title: "", align: "end", size: 1},
    ]

    const cloudProvidersRender = cloudProviders.map(cloudProviderItem => {
        return {
            settings: (
                <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40}}>
                    <IconButton>
                        <MoreHorizIcon />
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
                    <Grid container spacing={1}>
                        <Grid item>
                            {renderCloudProviderLogo(cloudProviderItem.connectorAlias.provider)}
                        </Grid>
                        <Grid item>
                            <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cloudProviderItem.connectorAlias.alias}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            ),
            connectorDeployed: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cloudProviderItem.connectorDeployed}</Typography>,
            connectorAttached: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cloudProviderItem.connectorAttached}</Typography>,
            actions: (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40}}>
                                <IconButton>
                                    <FormatAlignJustifyIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40}}>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ),
        }
    })


    return(
        <LamassuTable columnConf={cloudProviderTableColumns} data={cloudProvidersRender}/>
    )
}