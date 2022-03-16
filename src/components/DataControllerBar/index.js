import React, { useState } from "react";
import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, InputBase, Menu, MenuItem, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { AiOutlineSearch } from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { ColoredButton } from "components/LamassuComponents/ColoredButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ViewListIcon from '@mui/icons-material/ViewList';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import RefreshIcon from '@mui/icons-material/Refresh';

export const DataControllerBar = ({
    query = true,
    onQueryChange = () => { },
    sort = true,
    sortableItems = [],
    onSortChange = () => { },
    filter = true,
    filtrableItems = [],
    onFilterChange = () => { },
    addItem = true,
    onAddItemClick = () => { },
    refreshButton = true,
    onRefreshClick = () => { },
    cardListSwitch = false,
    onCardListSwitchChange =() => { },
}) => {

    const theme = useTheme()
    const [view, setView] = useState('module');

    const [sortAnchorEl, setSortAnchorEl] = useState(null);
    const handleSortClick = (event) => {
        if (sortAnchorEl !== event.currentTarget) {
            setSortAnchorEl(event.currentTarget);
        }
    }
    const handleSortClose = (event) => {
        setSortAnchorEl(null);
    }

    return (
        <Grid container alignItems={"center"} justifyContent="space-between" sx={{ marginBottom: "35px" }}>
            <Grid item xs="auto" container alignItems={"center"}>
                {
                    query && (
                        <Box component={Paper} sx={{ padding: "5px", height: 30, display: "flex", alignItems: "center", width: 300 }}>
                            <AiOutlineSearch size={20} color="#626365" style={{ marginLeft: 10, marginRight: 10 }} />
                            <InputBase fullWidth={true} style={{ color: "#555", fontSize: 14 }} />
                        </Box>
                    )
                }{
                    addItem && (
                        <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40, marginLeft: 10 }}>
                            <IconButton style={{ background: theme.palette.primary.light }}>
                                <AddIcon style={{ color: theme.palette.primary.main }} />
                            </IconButton>
                        </Box>
                    )
                }
            </Grid>
            <Grid item xs="auto" container spacing={4}>
                {
                    refreshButton && (
                        <Grid item>
                            <IconButton onClick={()=>{onRefreshClick()}} style={{backgroundColor: theme.palette.primary.light}}>
                                <RefreshIcon style={{color: theme.palette.primary.main}}/>
                            </IconButton>
                        </Grid>
                    )
                }
                {
                    sort && (
                        <Grid item xs="auto" container alignItems={"center"} spacing={2}>
                            <Grid item>
                                <Typography variant="button">Sort By</Typography>
                            </Grid>
                            <Grid item>
                                <ColoredButton customtextcolor={theme.palette.text.primary} customcolor={theme.palette.gray.light} size="small" variant="contained" disableFocusRipple disableRipple endIcon={sortAnchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={handleSortClick}>Alias</ColoredButton>
                                <Menu
                                    style={{ marginTop: 1, width: 200, borderRadius: 0 }}
                                    id="simple-menu"
                                    anchorEl={sortAnchorEl}
                                    open={Boolean(sortAnchorEl)}
                                    onClose={handleSortClose}
                                >
                                    <MenuItem style={{ width: "100%" }} onClick={(ev) => { }}>Alias</MenuItem>
                                    <MenuItem style={{ width: "100%" }} onClick={(ev) => { }}>ID</MenuItem>
                                    <MenuItem style={{ width: "100%" }} onClick={(ev) => { }}>Expiration Date</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    ) 
                }
                {
                    cardListSwitch && (
                        <Grid item xs="auto">
                            <ToggleButtonGroup
                                value={view}
                                exclusive
                                onChange={(ev, nextView) => { nextView !== null && setView(nextView) }}
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
                    )
                }
            </Grid>
        </Grid>
    )
}