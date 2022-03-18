import React, { useState } from "react"
import { Box, useTheme } from "@mui/system"
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined"
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined"
import { MenuSeparator } from "./SideBar"
import moment from "moment"
import { Badge, Divider, Grid, Menu, Typography } from "@mui/material"

const LamassuNotifications = ({ notificationsList }) => {
  const theme = useTheme()

  const info = {
    color: "#687EEB",
    bg: theme.palette.mode === "light" ? "#D4E9FF" : "#47576b"
  }
  const success = {
    bg: theme.palette.mode === "light" ? "#D0F9DB" : "#4a6952",
    color: theme.palette.mode === "light" ? "green" : "#25ee32"
  }
  const warn = {
    bg: theme.palette.mode === "light" ? "#FFE9C4" : "#635d55",
    color: "orange"
  }
  const error = {
    bg: theme.palette.mode === "light" ? "#FFB1AA" : "#6d504e",
    color: "red"
  }

  const notifications = []

  for (let index = notificationsList.length - 1; index >= 0; index--) {
    const e = notificationsList[index]
    let color = info
    switch (e.type) {
      case "info":
        color = info
        break
      case "warning":
        color = warn
        break
      case "error":
        color = error
        break
      case "success":
        color = success
        break

      default:
        break
    }
    notifications.push(
            <Grid item xs={12} container sx={{ borderBottom: `1px solid ${theme.palette.divider}` }} key={e.timestamp}>
                <Grid item xs={2} container>
                    <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", background: color.bg, borderRadius: 50, height: 30, width: 30 }}>
                        <AssignmentOutlinedIcon style={{ fontSize: 20, color: color.color }}/>
                    </Box>
                </Grid>
                <Grid item xs={10} container direction="column" spacing={1}>
                    <Grid item>
                        <Typography component="div" variant="body2">{e.message}</Typography>
                    </Grid>
                    <Grid item>
                        <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", justifyContent: "start", marginBottom: 10 }}>
                            <AccessAlarmsOutlinedIcon style={{ fontSize: 15, color: "#999", marginRight: "3px" }}/>
                            <Typography style={{ color: "#999", fontSize: 13 }}>{moment(e.timestamp).fromNow()}</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
    )
    if (index >= 1) {
      notifications.push(<MenuSeparator key={e.timestamp + "-separator"}/>)
    }
  }

  return (
        <Grid>
            {
                notifications.length === 0
                  ? (
                    <Box style={{ padding: "10px 20px 10px 20px" }}>
                        <Typography variant="caption" style={{ fontStyle: "italic" }}>No notifications</Typography>
                    </Box>
                    )
                  : (
                    <Grid container sx={{ padding: "10px" }} spacing={2} flexGrow={1}>
                        {notifications}
                    </Grid>
                    )
            }
        </Grid>
  )
}

export { LamassuNotifications }
