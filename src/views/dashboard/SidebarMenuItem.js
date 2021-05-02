import React, { useState, useEffect } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { Link } from "react-router-dom";
import { useTheme } from '@material-ui/core/styles';

import "./SideBar.css";
import { Typography } from '@material-ui/core';

export function MenuItem({ active, link, title, icon, children, style, onSelect, collapsed}) {
    const theme = useTheme();
    const [expand,  setExpand] = useState(false);

    const selectedBorderWidth = 5;
    var paddingLeftPxls = 0;
    const selected = active === link && link !== undefined;
    if (selected) {
        paddingLeftPxls = 10
    }else{
        paddingLeftPxls = 10 + selectedBorderWidth;
    }
    if (style && style.paddingLeft) {
        paddingLeftPxls = paddingLeftPxls + style.paddingLeft;
    }

    const cPrimary = theme.palette.primary;
    return (
        <div style={{borderLeft: selected ? selectedBorderWidth + "px solid " + cPrimary.main : ""}}>
            <List style={{padding: 0}}>
                <ListItem button style={{height:40, paddingLeft: paddingLeftPxls}} component={link? Link : null} to={link} onClick={()=>{link ? onSelect(link) : setExpand(!expand)}}>
                    
                    {
                        selected ? (
                            React.Children.map(icon, (child, key) =>
                                React.cloneElement(child, { style: {color: theme.palette.primary.main, fontSize: 24}, key })
                            )
                        ) : (
                            React.Children.map(icon, (child, key) =>
                                React.cloneElement(child, { style: {color: "#8E8E8E", fontSize: 24}, key })
                            )
                        )
                    }

                    {
                        !collapsed && (<Typography style={{marginLeft: 10, width: "100%", fontSize: 14, color: selected ? cPrimary.main : "", fontWeight: selected ? "bold" : ""}}> {title} </Typography>)
                    }

                    {children ? (expand ? <ExpandLess /> : <ExpandMore />) :  null}

                </ListItem>
                {children ? (
                    <Collapse in={expand}>
                    {
                        React.Children.map(children, (child, key) =>
                            React.cloneElement(child, { style: {paddingLeft: 25}, key })
                        )
                    }
                    </Collapse>
                    ) : (null)
                }
            </List>
        </div>
    )
}

export function MenuSectionTitle({ title, collapsed }) {
    return (
        !collapsed && <Typography className="sidebar-menu-section-title"> {title} </Typography>
    )
}

export function MenuSeparator({}) {
    const theme = useTheme();
    return (
        <div style={{borderTop: theme.palette.type == "light" ? "1px solid #ddd" : "1px solid #555"}}/>
    )
}

export function MenuButton({ onClick, icon, title, collapsed }) {
    return (
        <ListItem button onClick={onClick}>
            {
                React.Children.map(icon, (child, key) =>
                    React.cloneElement(child, { style: {color: "#8E8E8E"}, key})
                )
            }
            { !collapsed && <Typography style={{marginLeft: 10, width: "100%", fontSize: 14}}> {title} </Typography> }
            {/* !collapsed && <div style={{marginLeft: 10, width: "100%", fontSize: 14, color: "#555"}}> {title} </div> */}
        </ListItem>
    )
}