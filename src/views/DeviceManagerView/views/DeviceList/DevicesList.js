import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, InputBase, Menu, MenuItem, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import {AiOutlineSearch} from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';
import { DeviceCard } from "../../components/DeviceCard"
import { useState } from "react";
import DeviceInspector from "../DeviceInspector";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { GrayButton } from "components/LamassuComponents/GrayButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link, Route } from "react-router-dom";

export const DeviceList = ({devices}) => {
    const theme = useTheme()
    const [view, setView] = useState('module');

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
          setAnchorEl(event.currentTarget);
        }
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }

    return(
        <Grid container style={{height: "100%"}}>
            <Grid item xs={12} container>
                <Box sx={{padding: "25px", height: "calc(100% - 50px)"}}>
                    <Grid container alignItems={"center"} justifyContent="space-between" sx={{marginBottom: "35px"}}>
                        <Grid item xs="auto" container alignItems={"center"}>
                            <Box component={Paper} sx={{padding: "5px", height: 30, display: "flex", alignItems: "center", width: 300}}>
                                <AiOutlineSearch size={20} color="#626365" style={{marginLeft: 10, marginRight: 10}}/>
                                <InputBase fullWidth={true} style={{color: "#555", fontSize: 14}}/>
                            </Box>
                            <Box component={Paper} elevation={0} style={{borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40, marginLeft: 10}}>
                                <IconButton style={{background: theme.palette.primary.light}}>
                                    <AddIcon style={{color: theme.palette.primary.main}}/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs="auto" container spacing={4}>
                            <Grid item xs="auto" container alignItems={"center"} spacing={2}>
                                <Grid item>
                                    <Typography variant="button">Sort By</Typography>
                                </Grid>
                                <Grid item>
                                    <GrayButton size="small" variant="contained" disableFocusRipple disableRipple endIcon={anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} sx={{background: theme.palette.gray.light}} onClick={handleClick}>Alias</GrayButton>
                                    <Menu
                                        style={{marginTop: 1, width: 200, borderRadius: 0}}
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                        // MenuListProps={{ onMouseLeave: handleClose }}
                                    >
                                        <MenuItem style={{width: "100%"}} onClick={(ev)=>{}}>Alias</MenuItem>
                                        <MenuItem style={{width: "100%"}} onClick={(ev)=>{}}>ID</MenuItem>
                                        <MenuItem style={{width: "100%"}} onClick={(ev)=>{}}>Expiration Date</MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                            <Grid item xs="auto">
                                <ToggleButtonGroup
                                    value={view}
                                    exclusive
                                    onChange={(ev, nextView)=>{nextView !== null && setView(nextView)}}
                                    color="primary"
                                    size="small"
                                >
                                    <ToggleButton value="list" aria-label="list" >
                                        <ViewListIcon />
                                    </ToggleButton>
                                    <ToggleButton value="module" aria-label="module">
                                        <ViewModuleIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            devices.map(device=>(
                                <Grid item xs={3}>
                                    <Link to={device.id} style={{ textDecoration: 'none' }}>
                                        <DeviceCard style={{cursor: "pointer"}}  id={device.id} alias={device.alias} description={device.description} tags={device.tags} icon={device.icon} iconColor={device.icon_color} remainigDaysBeforeExpiration={device.remainig_days_before_expiration}/>
                                    </Link>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    )
}