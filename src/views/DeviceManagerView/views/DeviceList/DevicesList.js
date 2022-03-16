import React, { useState } from "react";
import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, InputBase, Menu, MenuItem, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { AiOutlineSearch } from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';
import { DeviceCard } from "../../components/DeviceCard"
import ViewListIcon from '@mui/icons-material/ViewList';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { ColoredButton } from "components/LamassuComponents/ColoredButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link, useNavigate } from "react-router-dom";
import { DynamicIcon } from "components/IconDisplayer/DynamicIcon";
import { LamassuChip } from "components/LamassuComponents/Chip";
import { LamassuTable } from "components/LamassuComponents/Table";
import { DataControllerBar } from "components/DataControllerBar";

export const DeviceList = ({ devices, refreshData }) => {
    const theme = useTheme()
    const [view, setView] = useState('module');
    const navigate = useNavigate()

    const devicesTableColumns = [
        { key: "icon", title: "", align: "start", size: 1 },
        { key: "id", title: "Device ID", align: "center", size: 3 },
        { key: "alias", title: "Alias", align: "center", size: 1 },
        { key: "status", title: "Status", align: "center", size: 1 },
        { key: "creation", title: "Creation Date", align: "center", size: 2 },
        { key: "keystrength", title: "Key Strength", align: "center", size: 1 },
        { key: "keyprops", title: "Key Properties", align: "center", size: 1 },
        { key: "tags", title: "Tags", align: "center", size: 2 },
        { key: "actions", title: "", align: "end", size: 1 },
    ]

    const devicesRender = devices.map(device => {
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
            keyprops: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{`RSA 2048`}</Typography>,
            tags: (
                <Grid item xs={12} container spacing={1} justifyContent="center">
                    {
                        device.tags.map((tag, idx) => (
                            <Grid item key={idx}>
                                <LamassuChip color={theme.palette.mode == "dark" ? ["#EEE", "#555"] : ["#555", "#EEEEEE"]} label={tag} compact={true} compactFontSize />
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
    })


    return (
        <Grid container style={{ height: "100%" }}>
            <Grid item xs={12} container>
                <Box sx={{ padding: "25px", height: "calc(100% - 50px)" }}>
                    <Grid container>
                        <DataControllerBar 
                            query
                            onQueryChange={(ev)=>{console.log("query change", ev)}}
                            addItem
                            onAddItemClick={(ev)=>{console.log("add click", ev)}}
                            filter
                            onFilterChange={(ev)=>{console.log("filter change", ev)}}
                            sort
                            onSortChange={(ev)=>{console.log("sort change", ev)}}
                            refreshButton
                            onRefreshClick={()=>{refreshData()}}
                            cardListSwitch
                            onCardListSwitchChange={(ev)=>{console.log("cardlist click", ev)}}
                        />
                    </Grid>
                    {
                        view == "module" ? (
                            <Grid container spacing={3}>
                                {
                                    devices.map(device => (
                                        <Grid item xs={3} key={device.id}>
                                            <Link to={device.id} style={{ textDecoration: 'none' }}>
                                                <DeviceCard style={{ cursor: "pointer" }} id={device.id} alias={device.alias} description={device.description} tags={device.tags} icon={device.icon_name} iconColor={device.icon_color} remainigDaysBeforeExpiration={device.remainig_days_before_expiration} />
                                            </Link>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        ) : (
                            <Box sx={{ padding: "25px", height: "calc(100% - 125px)" }} component={Paper}>
                                <LamassuTable data={devicesRender} columnConf={devicesTableColumns} />
                            </Box>
                        )
                    }
                </Box>
            </Grid>
        </Grid>
    )
}