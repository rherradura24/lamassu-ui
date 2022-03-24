import React, { useEffect, useState } from "react"
import { useTheme } from "@emotion/react"
import { Button, Divider, Grid, Tab, Tabs, Typography, TextField, Skeleton } from "@mui/material"
import { Box } from "@mui/system"
import SyntaxHighlighter from "react-syntax-highlighter"
import { materialLight, materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism"
import EditIcon from "@mui/icons-material/Edit"
import { AwsIcon } from "components/CloudProviderIcons"
import SendIcon from "@mui/icons-material/Send"
import { LamassuChip } from "components/LamassuComponents/Chip"
import { awsIotCoreConstants, cloudConnectorConsistencyStatus } from "redux/ducks/cloud-proxy/Constants"
import moment from "moment"

const AwsIotCore = ({ caName, connectorId, connectorConfig, onAccessPolicyChange = () => { } }) => {
    console.log(caName, connectorId, connectorConfig);
    const theme = useTheme()
    const themeMode = theme.palette.mode

    const [selectedTab, setSelectedTab] = useState(0)
    const [editMode, setEditMode] = useState(false)
    const [awsPolicy, setAwsPolicy] = useState("")

    const [selectedCAcloudConfiguration, setSelectedCAcloudConfiguration] = useState(undefined)

    const buildAwsPolicy = (region, accountId) => {
        return {
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: "Allow",
                    Action: [
                        "iot:Connect"
                    ],
                    Resource: [
                        "arn:aws:iot:" + region + ":" + accountId + ":client/${iot:Connection.Thing.ThingName}"
                    ]
                },
                {
                    Effect: "Allow",
                    Action: [
                        "iot:Publish",
                        "iot:Receive"
                    ],
                    Resource: [
                        "arn:aws:iot:" + region + ":" + accountId + ":topic/${iot:Connection.Thing.ThingName}/*"
                    ]
                },
                {
                    Effect: "Allow",
                    Action: [
                        "iot:Subscribe"
                    ],
                    Resource: [
                        "arn:aws:iot:" + region + ":" + accountId + ":topicfilter/${iot:Connection.Thing.ThingName}/*"
                    ]
                }
            ]
        }
    }


    useEffect(() => {
        if (connectorConfig !== undefined) {
            const filteredCloudConfigList = connectorConfig.synchronized_cas.filter(ca => ca.ca_name === caName)
            var newSelectedCAConfig = undefined
            if (filteredCloudConfigList.length === 1) {
                newSelectedCAConfig = filteredCloudConfigList[0]
            }

            if (newSelectedCAConfig !== undefined && newSelectedCAConfig.config) {
                if (newSelectedCAConfig.config.policy_status === awsIotCoreConstants.PolicyStatus.ACTIVE) {
                    setAwsPolicy(JSON.stringify(JSON.parse(newSelectedCAConfig.config.policy_document), null, 4))
                } else {
                    setAwsPolicy(JSON.stringify(buildAwsPolicy(connectorConfig.cloud_configuration.iot_core_endpoint.split(".")[2], connectorConfig.cloud_configuration.account_id), null, 4))
                }
            }

            setSelectedCAcloudConfiguration(newSelectedCAConfig)
        }
    }, [connectorConfig])

    return (

        false === true ? (
            <></>
        ) : (
            <Box>
                <AwsIcon />
                <Grid container spacing={2} sx={{ marginBottom: "10px", marginTop: "5px" }}>
                    <Grid item xs={2}>
                        <Typography style={{ fontSize: 14 }}>Account ID:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        {
                            connectorConfig === undefined ? (
                                <Skeleton variant="rect" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                            ) : (
                                <Typography style={{ fontSize: 14 }}>{connectorConfig.cloud_configuration.account_id}</Typography>
                            )
                        }
                    </Grid>
                    <Grid item xs={2}>
                        <Typography style={{ fontSize: 14 }}>IoT Core endpoint:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        {
                            connectorConfig === undefined ? (
                                <Skeleton variant="rect" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                            ) : (
                                <Typography style={{ fontSize: 14 }}>{connectorConfig.cloud_configuration.iot_core_endpoint}</Typography>
                            )
                        }
                    </Grid>
                </Grid>
                <Divider />
                {
                    selectedCAcloudConfiguration  && (
                        selectedCAcloudConfiguration.consistency_status === cloudConnectorConsistencyStatus.CONSISTENT ? (
                        <>
                            <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                                <Grid item xs={2}>
                                    <Typography style={{ fontSize: 14 }}>CA certificate ID:</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    {
                                        connectorConfig === undefined ? (
                                            <Skeleton variant="rect" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                        ) : (
                                            <Typography style={{ fontSize: 14 }}>{selectedCAcloudConfiguration.config.id}</Typography>
                                        )
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography style={{ fontSize: 14 }}>CA certificate ARN:</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    {
                                        connectorConfig === undefined ? (
                                            <Skeleton variant="rect" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                        ) : (
                                            <Typography style={{ fontSize: 14 }}>{selectedCAcloudConfiguration.config.arn}</Typography>
                                        )
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography style={{ fontSize: 14 }}>Status</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    {
                                        connectorConfig === undefined ? (
                                            <Skeleton variant="rect" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                        ) : (
                                            <LamassuChip color={selectedCAcloudConfiguration.config.status_color} label={selectedCAcloudConfiguration.config.status} />
                                        )
                                    }
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography style={{ fontSize: 14 }}>Created:</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                    {
                                        connectorConfig === undefined ? (
                                            <Skeleton variant="rect" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                        ) : (
                                            <Typography style={{ fontSize: 14 }}>{moment(selectedCAcloudConfiguration.config.creation_date).format("DD-MM-YYYY HH:mm")}</Typography>
                                        )
                                    }
                                </Grid>
                            </Grid>

                            <Box style={{ marginTop: "25px" }}>
                                <Tabs value={selectedTab} onChange={(ev, newValue) => setSelectedTab(newValue)}>
                                    <Tab label="Active Policy" />
                                </Tabs>
                            </Box>

                            <Divider />
                            <Box sx={{ paddingTop: "20px" }}>
                                {
                                    selectedTab === 0 && (
                                        <Grid container spacing={2}>
                                            {
                                                editMode
                                                    ? (
                                                        <>
                                                            <Grid item xs={12}>
                                                                <TextField
                                                                    variant="outlined"
                                                                    multiline
                                                                    aria-label="minimum height"
                                                                    minRows={10}
                                                                    placeholder="Minimum 3 rows"
                                                                    fullWidth
                                                                    InputProps={{
                                                                        style: {
                                                                            fontSize: 12,
                                                                            fontFamily: "monospace"
                                                                        },
                                                                        spellCheck: false
                                                                    }}
                                                                    value={awsPolicy}
                                                                    onChange={(ev)=>{setAwsPolicy(ev.target.value)}}
                                                                    error={()=>{
                                                                        try {
                                                                            JSON.parse(awsPolicy)
                                                                            return false
                                                                        } catch (e) {
                                                                            return true
                                                                        }
                                                                    }}
                                                                />

                                                            </Grid>
                                                            <Grid item xs={12} container spacing={2}>
                                                                <Grid item xs="auto">
                                                                    <Button variant="outlined">
                                                                        Cancel
                                                                    </Button>
                                                                </Grid>
                                                                <Grid item xs="auto">
                                                                    <Button variant="contained" startIcon={<SendIcon />} onClick={() => { onAccessPolicyChange(connectorId, JSON.stringify(awsPolicy)) }}>
                                                                        Save
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </>

                                                    )
                                                    : (
                                                        <>
                                                            <Grid item xs={12}>
                                                                <Button variant="outlined" startIcon={<EditIcon />} onClick={() => setEditMode(true)}>
                                                                    Edit Policy
                                                                </Button>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                {
                                                                    selectedCAcloudConfiguration.config.policy_status === awsIotCoreConstants.PolicyStatus.ACTIVE ? (
                                                                        <SyntaxHighlighter language="json" style={themeMode === "light" ? materialLight : materialOceanic} customStyle={{ fontSize: 12, padding: 20, borderRadius: 10, width: "fit-content", height: "fit-content" }} wrapLines={true} lineProps={{ style: { color: theme.palette.text.primaryLight } }}>
                                                                            {awsPolicy}
                                                                        </SyntaxHighlighter>
                                                                    ) : (
                                                                        <Box>No policy</Box>
                                                                    )
                                                                }
                                                            </Grid>
                                                        </>
                                                    )
                                            }
                                        </Grid>
                                    )
                                }
                            </Box>
                        </>
                        ) : (
                            selectedCAcloudConfiguration.consistency_status === cloudConnectorConsistencyStatus.INCONSISTENT  && (
                                <Typography sx={{marginTop: "10px", fontStyle: "italic"}}>Connector has an inconsistent status for this CA</Typography>
                            )
                        )
                    )
                }
            </Box>
        )

    )
}

export default AwsIotCore
