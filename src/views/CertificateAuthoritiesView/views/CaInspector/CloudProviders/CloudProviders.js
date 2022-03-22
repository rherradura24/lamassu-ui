import React, { useState } from "react"

import { connect } from "react-redux"
import cloudProxyDuck from "redux/ducks/cloud-proxy"
import { createLoader } from "components/utils"
import { status } from "redux/utils/constants"

import { useTheme } from "@emotion/react"
import { Box, Button, Grid, IconButton, Paper, Skeleton, Typography } from "@mui/material"
import { LamassuStatusChip } from "components/LamassuComponents/Chip"
import { LamassuTable } from "components/LamassuComponents/Table"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify"
import DeleteIcon from "@mui/icons-material/Delete"
import { CloudProviderIcon } from "components/CloudProviderIcons"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import { GoLinkExternal } from "react-icons/go"
import AddIcon from "@mui/icons-material/Add"
import EnableConnectorSynchronizationModal from "./Actions/EnableSynchronization"

const CloudProvider = ({ refreshing, cloudConnectors, caName }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const [isEnableConnectorOpen, setIsEnableConnectorOpen] = useState({ isOpen: false })

  const cloudConnectorTableColumns = [
    { key: "settings", title: "", align: "start", size: 1 },
    { key: "connectorId", title: "Connector ID", align: "center", size: 3 },
    { key: "syncStatus", title: "Synchronization Status", align: "center", size: 2 },
    { key: "connectorStatus", title: "Connector Status", align: "center", size: 2 },
    { key: "connectorType", title: "Connector Type", align: "center", size: 2 },
    { key: "connectorAlias", title: "Alias", align: "center", size: 2 },
    { key: "connectorEnabled", title: "Enabled date", align: "center", size: 1 },
    { key: "actions", title: "", align: "end", size: 1 }
  ]

  const cloudConnectorsRender = cloudConnectors.map(cloudConnector => {
    const filteredSynchronizedCAs = cloudConnector.synchronized_cas.filter(syncCa => syncCa.ca_name === caName)
    const enabledConnectorSync = filteredSynchronizedCAs.length === 1
    return {
      settings: (
                <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                    <IconButton>
                        <MoreHorizIcon fontSize={"small"}/>
                    </IconButton>
                </Box>
      ),
      connectorId: <Typography style={{ fontWeight: "500", fontSize: 14, color: theme.palette.text.primary }}>#{cloudConnector.id}</Typography>,
      syncStatus: (
                <LamassuStatusChip label={enabledConnectorSync ? "Enabled" : "Disabled"} color={enabledConnectorSync ? "green" : "red"}/>
      ),
      connectorStatus: (
                <LamassuStatusChip label={cloudConnector.status} color={cloudConnector.status_color}/>
      ),
      connectorType: (
                <Box>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item>
                            <CloudProviderIcon cloudProvider={cloudConnector.cloud_provider}/>
                        </Grid>
                        {/* <Grid item>
                            <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cloudConnector.cloud_provider}</Typography>
                        </Grid> */}
                    </Grid>
                </Box>
      ),
      connectorAlias: (
                <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary }}>{cloudConnector.name}</Typography>
      ),
      connectorDeployed: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{"-"}</Typography>,
      connectorEnabled: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{
                enabledConnectorSync ? moment(filteredSynchronizedCAs[0].enabled_ts).format("DD/MM/YYYY") : "-"
            }</Typography>,
      actions: (
                <Box>
                    <Grid container spacing={1}>
                        {
                            enabledConnectorSync
                              ? (
                                <>
                                    <Grid item>
                                        <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                                            <IconButton onClick={() => navigate(`awsiotcore/${cloudConnector.id}`)} >
                                                <FormatAlignJustifyIcon fontSize={"small"}/>
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                    <Grid item>
                                        <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                                            <IconButton >
                                                <DeleteIcon fontSize={"small"}/>
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </>
                                )
                              : (
                                <>
                                    <Grid item>
                                        <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                                            <IconButton onClick={() => setIsEnableConnectorOpen({ isOpen: true, connectorId: cloudConnector.id })} >
                                                <AddIcon fontSize={"small"}/>
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </>
                                )
                        }
                    </Grid>
                </Box>
      )
    }
  })

  return (
    refreshing.status === status.PENDING
      ? (
            <Box sx={{ width: "100%", marginBottom: "20px" }}>
                <Skeleton variant="rect" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                <Skeleton variant="rect" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                <Skeleton variant="rect" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
            </Box>
        )
      : (
          cloudConnectors.length > 0
            ? (
                <>
                    <LamassuTable columnConf={cloudConnectorTableColumns} data={cloudConnectorsRender}/>
                    <EnableConnectorSynchronizationModal isOpen={isEnableConnectorOpen.isOpen} connectorId={isEnableConnectorOpen.connectorId} caName={caName} onClose={() => setIsEnableConnectorOpen({ isOpen: false })}/>
                </>
              )
            : (
                <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }}>
                    <Grid item xs="auto" container justifyContent={"center"} alignItems={"center"} flexDirection="column">
                        <img src={process.env.PUBLIC_URL + "/assets/icon-cloud.png"} height={150} style={{ marginBottom: "25px" }}/>
                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 22, lineHeight: "24px", marginRight: "10px" }}>
                        Synchronize your PKI with Cloud Providers
                        </Typography>
                        <Typography>Install different cloud connectors to synchronize your certificates with AWS, Azure or Google Cloud</Typography>
                        <Button
                            endIcon={<GoLinkExternal/>}
                            variant="contained"
                            sx={{ marginTop: "10px", color: theme.palette.primary.main, background: theme.palette.primary.light }}
                            onClick={() => {
                              window.open("https://github.com/lamassuiot/lamassu-compose", "_blank")
                            }}
                        >
                            Go to install instructions
                        </Button>
                    </Grid>
                </Grid>
              )
        )
  )
}

const mapStateToProps = (state, { caName }) => {
  return {
    cloudConnectors: cloudProxyDuck.reducer.getCloudConnectors(state),
    refreshing: cloudProxyDuck.reducer.isRequestInProgress(state)
  }
}

const mapDispatchToProps = (dispatch, { caName }) => ({
  onMount: () => {
    dispatch(cloudProxyDuck.actions.getCloudConnectors())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CloudProvider))
