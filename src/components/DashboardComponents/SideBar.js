import React, { useState, useEffect } from "react"

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined"
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined"
import Brightness2OutlinedIcon from "@mui/icons-material/Brightness2Outlined"
import ExpandMore from "@mui/icons-material/ExpandMore"
import ExpandLess from "@mui/icons-material/ExpandLess"
import Brightness5OutlinedIcon from "@mui/icons-material/Brightness5Outlined"

import "./SideBar.css"
import { Collapse, Grid, Link, List, ListItem, Paper, Typography, useTheme } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import { Box } from "@mui/system"

const SideBar = ({ darkTheme, onTogleDark, onCollapse, collapsed, menuConfig }) => {
  const theme = useTheme()
  const routerNavigation = useNavigate()
  const location = useLocation()
  const [selectedPath, setSelectedPath] = useState("")

  const handleSelectedPath = (newPath) => {
    setSelectedPath(newPath)
    routerNavigation(newPath)
  }

  useEffect(() => {
    setSelectedPath(location.pathname)
  }, [])

  return (
        <Paper style={{ borderRadius: 0 }} elevation={0}>
            <Grid item className="sidebar-wrapper">
                <div>
                    <MenuButton title={"Collapse"} icon={collapsed ? <KeyboardArrowRightOutlinedIcon /> : <KeyboardArrowLeftOutlinedIcon />} onClick={() => { onCollapse(collapsed) }} collapsed={collapsed} />
                    {
                        menuConfig.map(configItem => (
                            <Box key={Math.random()}>
                                {
                                    <>
                                        <MenuSeparator />
                                        {
                                            configItem.menuTitle !== "" && (
                                                <MenuSectionTitle title={configItem.menuTitle} collapsed={collapsed}/>
                                            )
                                        }
                                        {
                                            configItem.menuItems.map(menuConfigItem => (
                                                <MenuItem
                                                    key={menuConfigItem.path}
                                                    title={menuConfigItem.title}
                                                    link={menuConfigItem.link}
                                                    collapsed={collapsed}
                                                    active={selectedPath}
                                                    exactLink={!menuConfigItem.path.includes("*")}
                                                    onSelect={(link) => { console.log(link); handleSelectedPath(link) }}
                                                    icon={menuConfigItem.icon}
                                                />
                                            ))
                                        }
                                    </>
                                }
                            </Box>
                        ))
                    }
                    <MenuSeparator />
                    <MenuButton title={darkTheme ? "Light" : "Dark"} icon={darkTheme ? <Brightness5OutlinedIcon /> : <Brightness2OutlinedIcon />} onClick={onTogleDark} collapsed={collapsed} />
                </div>
            </Grid>
        </Paper>
  )
}

const MenuItem = ({ active, exactLink = false, link, title, icon, children, style, onSelect, collapsed }) => {
  const theme = useTheme()
  const [expand, setExpand] = useState(false)

  const selectedBorderWidth = 5
  let paddingLeftPxls = 0
  const selected = exactLink ? active === link && link !== undefined : active.startsWith(link) && link !== undefined
  if (selected) {
    paddingLeftPxls = 10
  } else {
    paddingLeftPxls = 10 + selectedBorderWidth
  }
  if (style && style.paddingLeft) {
    paddingLeftPxls = paddingLeftPxls + style.paddingLeft
  }

  const cPrimary = theme.palette.primary
  return (
        <div style={{ borderLeft: selected ? selectedBorderWidth + "px solid " + cPrimary.main : "" }}>
            <List style={{ padding: 0 }}>
                <ListItem button style={{ height: 40, paddingLeft: paddingLeftPxls }} component={link ? Link : null} to={link} onClick={() => { link ? onSelect(link) : setExpand(!expand) }}>

                    {
                        selected
                          ? (
                              React.Children.map(icon, (child, key) =>
                                React.cloneElement(child, { style: { color: theme.palette.primary.main, fontSize: 24 }, key })
                              )
                            )
                          : (
                              React.Children.map(icon, (child, key) =>
                                React.cloneElement(child, { style: { color: theme.palette.text.secondary, fontSize: 24 }, key })
                              )
                            )
                    }

                    {
                        !collapsed && (<Typography style={{ marginLeft: 10, width: "100%", fontSize: 14, color: selected ? cPrimary.main : "", fontWeight: selected ? "bold" : "" }}> {title} </Typography>)
                    }

                    {children ? (expand ? <ExpandLess /> : <ExpandMore />) : null}

                </ListItem>
                {children
                  ? (
                    <Collapse in={expand}>
                        {
                            React.Children.map(children, (child, key) =>
                              React.cloneElement(child, { style: { paddingLeft: 25 }, key })
                            )
                        }
                    </Collapse>
                    )
                  : (null)
                }
            </List>
        </div>
  )
}

const MenuSectionTitle = ({ title, collapsed }) => {
  return (
    !collapsed && <Typography className="sidebar-menu-section-title"> {title} </Typography>
  )
}

const MenuSeparator = ({ }) => {
  const theme = useTheme()
  return (
        <div style={{ borderTop: `1px solid ${theme.palette.divider}` }}/>
  )
}

const MenuButton = ({ onClick, icon, title, collapsed }) => {
  const theme = useTheme()

  return (
        <ListItem button onClick={onClick}>
            {
                React.Children.map(icon, (child, key) =>
                  React.cloneElement(child, { style: { color: theme.palette.text.secondary }, key })
                )
            }
            {!collapsed && <Typography style={{ marginLeft: 10, width: "100%", fontSize: 14 }}> {title} </Typography>}
            {/* !collapsed && <div style={{marginLeft: 10, width: "100%", fontSize: 14, color: "#555"}}> {title} </div> */}
        </ListItem>
  )
}

export {
  SideBar,
  MenuSeparator
}
