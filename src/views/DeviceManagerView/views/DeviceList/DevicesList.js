import React, { useState, useEffect } from "react"
import { useTheme } from "@emotion/react"
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material"
import { DeviceCard } from "../../components/DeviceCard"
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify"
import { Link, useNavigate } from "react-router-dom"
import { DynamicIcon } from "components/IconDisplayer/DynamicIcon"
import { LamassuChip } from "components/LamassuComponents/Chip"
import { LamassuTableWithDataController } from "components/LamassuComponents/Table"
import { GoLinkExternal } from "react-icons/go"

export const DeviceList = ({ devices, refreshData }) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const devicesTableColumns = [
    { key: "icon", title: "", align: "start", size: 1 },
    { key: "id", title: "Device ID", align: "center", type: "string", query: true, size: 3 },
    { key: "alias", title: "Alias", align: "center", type: "string", query: true, size: 3 },
    { key: "status", title: "Status", align: "center", type: "string", size: 1 },
    { key: "creation", title: "Creation Date", align: "center", type: "date", size: 2 },
    { key: "keystrength", title: "Key Strength", align: "center", type: "string", size: 1 },
    { key: "keyprops", title: "Key Properties", align: "center", type: "string", size: 1 },
    { key: "tags", title: "Tags", align: "center", size: 2 },
    { key: "actions", title: "", align: "end", size: 1 }
  ]

  const devicesListRender = device => {
    return {
      icon: (
                <Box component={Paper} sx={{ padding: "5px", background: device.icon_color, borderRadius: 2, width: 20, height: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <DynamicIcon icon={device.icon_name} size={16} color="#fff" />
                </Box>
      ),
      id: <Typography style={{ fontWeight: "700", fontSize: 14, color: theme.palette.text.primary }}>#{device.id}</Typography>,
      alias: <Typography style={{ fontWeight: "500", fontSize: 14, color: theme.palette.text.primary }}>{device.alias}</Typography>,
      status: <LamassuChip label={"Provisioned"} color="green" />,
      creation: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{device.createdTs}</Typography>,
      keystrength: <LamassuChip label={"Medium"} color="orange" />,
      keyprops: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{"RSA 2048"}</Typography>,
      tags: (
                <Grid item xs={12} container spacing={1} justifyContent="center">
                    {
                        device.tags.map((tag, idx) => (
                            <Grid item key={idx}>
                                <LamassuChip color={theme.palette.mode === "dark" ? ["#EEE", "#555"] : ["#555", "#EEEEEE"]} label={tag} compact={true} compactFontSize />
                            </Grid>
                        ))
                    }
                </Grid>
      ),
      actions: (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                                <IconButton onClick={() => navigate(device.id)}>
                                    <FormatAlignJustifyIcon fontSize={"small"} />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
      )
    }
  }

  const renderCardDevice = device => {
    return (
            <Grid item xs={3}>
                <Link to={device.id} style={{ textDecoration: "none" }}>
                    <DeviceCard style={{ cursor: "pointer" }} id={device.id} alias={device.alias} description={device.description} tags={device.tags} icon={device.icon_name} iconColor={device.icon_color} remainigDaysBeforeExpiration={device.remainig_days_before_expiration} />
                </Link>
            </Grid>
    )
  }

  return (
    devices.length > 0
      ? (
            <Grid container style={{ height: "100%" }}>
                <Grid item xs={12} container>
                    <Box sx={{ padding: "25px", height: "calc(100% - 50px)", width: "100%" }}>
                        <LamassuTableWithDataController
                            data={devices}
                            columnConf={devicesTableColumns}
                            includeCardView={true}
                            renderCardMethod={renderCardDevice}
                            renderMethod={devicesListRender}
                            tableProps={{
                              component: Paper,
                              style: {
                                padding: "30px",
                                width: "calc(100% - 60px)"
                              }
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        )
      : (
            <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }}>
                <Grid item xs="auto" container justifyContent={"center"} alignItems={"center"} flexDirection="column">
                    <img src={process.env.PUBLIC_URL + "/assets/icon-iot.png"} height={150} style={{ marginBottom: "25px" }} />
                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 22, lineHeight: "24px", marginRight: "10px" }}>
                        Enroll your first IoT Device
                    </Typography>
                    <Typography>Manage the enrollment process of your devices by registering and enrolling using the EST protocol</Typography>
                    <Button
                        endIcon={<GoLinkExternal />}
                        variant="contained"
                        sx={{ marginTop: "10px", color: theme.palette.primary.main, background: theme.palette.primary.light }}
                        onClick={() => {
                          window.open("https://github.com/lamassuiot/lamassu-compose", "_blank")
                        }}
                    >
                        Go to Device enrollment instructions
                    </Button>
                </Grid>
            </Grid>
        )
  )
}
