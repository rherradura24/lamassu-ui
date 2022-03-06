import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import { Button, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { materialLight, materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import EditIcon from '@mui/icons-material/Edit';
import { AwsIcon } from "components/CloudProviderIcons";

export default ({ }) => {
    const theme = useTheme()
    const themeMode = theme.palette.mode

    const [selectedTab, setSelectedTab] = useState(0)

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

    return (
        <Box>
            <AwsIcon/>
            <Grid container spacing={2} sx={{marginBottom: "10px", marginTop: "5px"}}>
                <Grid item xs={2}>
                    <Typography style={{ fontSize: 14 }}>Account ID:</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography style={{ fontSize: 14 }}>345876576284</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{ fontSize: 14 }}>IoT Core endpoint:</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography style={{ fontSize: 14 }}>a3hczhtwc7h4es-ats.iot.eu-west-1.amazonaws.com</Typography>
                </Grid>
            </Grid>
            <Divider/>
            <Grid container spacing={2} sx={{marginTop: "10px"}}>
                <Grid item xs={2}>
                    <Typography style={{ fontSize: 14 }}>CA certificate ID:</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography style={{ fontSize: 14 }}>bfa2c07ec0d93e13dced643e0c175f3e95f398ef45acfff8db2f236c553c6688</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{ fontSize: 14 }}>CA certificate ARN:</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography style={{ fontSize: 14 }}>arn:aws:iot:eu-west-1:345876576284:cacert/bfa2c07ec0d93e13dced643e0c175f3e95f398ef45acfff8db2f236c553c6688</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography style={{ fontSize: 14}}>Registered:</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography style={{ fontSize: 14 }}>March 20, 2017, 12:44:19 (UTC+0100)</Typography>
                </Grid>
            </Grid>


            <Box style={{ marginTop: "25px"}}>
                <Tabs value={selectedTab} onChange={(ev, newValue) => setSelectedTab(newValue)}>
                    <Tab label="Binded Policy" />
                </Tabs>
            </Box>

            <Divider />
            <Box  sx={{paddingTop: "20px"}}>
                {
                    selectedTab === 0 && (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Button variant="outlined" startIcon={<EditIcon />}>
                                    Edit Policy
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <SyntaxHighlighter language="json" style={themeMode == "light" ? materialLight : materialOceanic} customStyle={{ fontSize: 10, padding: 20, borderRadius: 10, width: "fit-content", height: "fit-content" }} wrapLines={true} lineProps={{ style: { color: theme.palette.text.primaryLight } }}>
                                    {JSON.stringify(awsPolicy, null, 4)}
                                </SyntaxHighlighter>
                            </Grid>
                        </Grid>
                    )
                }
            </Box>


        </Box>
    )
}