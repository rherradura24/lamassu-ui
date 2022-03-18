import React, { useState, useEffect } from "react"
import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, InputBase, Menu, MenuItem, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { AiOutlineSearch } from "react-icons/ai"
import AddIcon from "@mui/icons-material/Add"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import { ColoredButton } from "components/LamassuComponents/ColoredButton"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import ViewListIcon from "@mui/icons-material/ViewList"
import RefreshIcon from "@mui/icons-material/Refresh"

export const LamassuTable = ({ columnConf = [], data = [], style = {}, ...props }) => {
  console.log(columnConf.reduce((prev, item) => prev + item.size, 0))
  const theme = useTheme()
  return (
        <Box style={{ width: "100%", ...style }} {...props}>
            <Grid container spacing={1}>
                {
                    <Grid item columns={columnConf.reduce((prev, item) => prev + item.size, 0)} container alignItems="center" style={{ padding: "0 10px 0 10px" }}>
                        {
                            columnConf.map((item, idx) => (
                                <Grid item xs={item.size} container justifyContent="center" style={{ marginBottom: 15 }} key={idx + "-col"}>
                                    <Typography style={{ color: theme.palette.text.secondary, fontWeight: "400", fontSize: 12, textAlign: "center" }}>{item.title}</Typography>
                                </Grid>
                            ))
                        }
                    </Grid>
                }
                {
                    data.map((dataItem, idx) => (
                        <Grid item columns={columnConf.reduce((prev, item) => prev + item.size, 0)} container style={{ borderRadius: 10, border: `1.5px solid ${theme.palette.divider}`, padding: 10, marginBottom: 10 }} alignItems="center" key={idx}>
                            {
                                columnConf.map((item, idx2) => (
                                    <Grid item xs={item.size} container justifyContent={item.align} style={{ padding: "0px 4px" }} key={idx + "-data-" + idx2}>
                                        {dataItem[item.key]}
                                    </Grid>
                                ))
                            }
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
  )
}

export const LamassuTableWithDataController = ({ columnConf = [], data = [], renderMethod = () => { }, includeCardView = false, renderCardMethod = () => { }, style = {}, onRefreshClick = () => { }, tableProps = {} }) => {
  const theme = useTheme()

  const [dataset, setDataset] = useState(data)
  useEffect(() => {
    setDataset(data)
  }, [data])

  const [view, setView] = useState(includeCardView ? "card" : "list")

  const [dataRender, setDataRender] = useState([[], []])
  useEffect(() => {
    console.log(view)
    const newDataRender = []
    newDataRender.push(dataset.map(dataItem => {
      return renderMethod(dataItem)
    }))
    if (includeCardView) {
      newDataRender.push(dataset.map(dataItem => {
        return renderCardMethod(dataItem)
      }))
    }
    setDataRender(newDataRender)
  }, [dataset, theme.palette.mode])

  const queryPlaceholder = ""

  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState([])
  const [order, setOrderBy] = useState()

  const itemsPerPageOptions = [
    15,
    25,
    50
  ]
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0])
  const [itemsPerPageEl, setItemsPerPageEl] = useState(null)
  const handleItemsPerPageElClick = (event) => {
    if (itemsPerPageEl !== event.currentTarget) {
      setItemsPerPageEl(event.currentTarget)
    }
  }
  const handleItemsPerPageElClose = (event) => {
    setItemsPerPageEl(null)
  }

  const [sortAnchorEl, setSortAnchorEl] = useState(null)
  const handleSortClick = (event) => {
    if (sortAnchorEl !== event.currentTarget) {
      setSortAnchorEl(event.currentTarget)
    }
  }
  const handleSortClose = (event) => {
    setSortAnchorEl(null)
  }

  const [fastTypeQuery, setFastTypeQuery] = useState("")
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(fastTypeQuery)
    }, 1500)

    return () => clearTimeout(timer)
  }, [fastTypeQuery])

  useEffect(() => {
    console.log(query, filters, order)
    console.log(">> Prefilter")
    console.log(">> Post")
  }, [query, filters, order])

  return (
        <Box>
            <Box sx={{ marginBottom: "25px", display: "flex", justifyContent: "space-between", alignItems: "start", width: "100%" }}>
                <Box sx={{ display: "flex" }}>
                    <Box>
                        <Box component={Paper} sx={{ padding: "5px", height: 30, display: "flex", alignItems: "center", width: 300 }}>
                            <AiOutlineSearch size={20} color="#626365" style={{ marginLeft: 10, marginRight: 10 }} />
                            <InputBase fullWidth={true} style={{ color: "#555", fontSize: 14 }} placeholder={queryPlaceholder} value={fastTypeQuery} onChange={(ev) => setFastTypeQuery(ev.target.value)} />
                        </Box>
                        <Typography style={{ fontWeight: 500, fontSize: 12, padding: "10px", color: theme.palette.text.primaryLight }}>{dataset.length} RESULTS</Typography>
                    </Box>

                    <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40, marginLeft: 10 }}>
                        <IconButton style={{ background: theme.palette.primary.light }}>
                            <AddIcon style={{ color: theme.palette.primary.main }} />
                        </IconButton>
                    </Box>
                </Box>
                <Grid container spacing={2} sx={{ width: "fit-content" }}>

                    <Grid item xs="auto">
                        <IconButton onClick={() => { onRefreshClick() }} style={{ backgroundColor: theme.palette.primary.light }}>
                            <RefreshIcon style={{ color: theme.palette.primary.main }} />
                        </IconButton>
                    </Grid>

                    <Grid item xs="auto" container alignItems={"center"} spacing={2}>

                        <Grid item>
                            <ColoredButton customtextcolor={theme.palette.text.primary} customcolor={theme.palette.gray.light} size="small" variant="contained" disableFocusRipple disableRipple endIcon={itemsPerPageEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={handleItemsPerPageElClick}>{itemsPerPage} Items per Page</ColoredButton>
                            <Menu
                                style={{ marginTop: 1, width: 200, borderRadius: 0 }}
                                id="simple-menu"
                                anchorEl={itemsPerPageEl}
                                open={Boolean(itemsPerPageEl)}
                                onClose={handleItemsPerPageElClose}
                            >
                                {
                                    itemsPerPageOptions.map(option => {
                                      return <MenuItem style={{ width: "100%" }} key={option} onClick={(ev) => { setItemsPerPage(option); handleItemsPerPageElClose() }}>{option}</MenuItem>
                                    })
                                }
                            </Menu>
                        </Grid>
                    </Grid>

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

                    {
                        includeCardView && (
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
                                    <ToggleButton value="card" aria-label="card">
                                        <ViewModuleIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
            <Box>
                {
                    view === "list"
                      ? (
                        <LamassuTable columnConf={columnConf} data={dataRender[0]} {...tableProps} />
                        )
                      : (
                        <Grid container spacing={3}>
                            {
                                dataRender[1].map(RenderItem =>
                                  React.cloneElement(RenderItem)
                                )
                            }
                        </Grid>
                        )
                }
            </Box>
        </Box>
  )
}
