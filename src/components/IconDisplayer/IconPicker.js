import React from "react"
import * as Ai from "react-icons/ai";
import * as Bs from "react-icons/bs";
import * as Bi from "react-icons/bi";
import * as Di from "react-icons/di";
import * as Fi from "react-icons/fi";
import * as Fc from "react-icons/fc";
import * as Fa from "react-icons/fa";
import * as Gi from "react-icons/gi";
import * as Go from "react-icons/go";
import * as Gr from "react-icons/gr";
import * as Hi from "react-icons/hi";
import * as Io from "react-icons/io";
import * as Io5 from "react-icons/io5";
import * as Md from "react-icons/md";
import * as Ri from "react-icons/ri";
import * as Si from "react-icons/si";
import * as Ti from "react-icons/ti";
import * as Vsc from "react-icons/vsc";
import * as Cg from "react-icons/cg";
import { DynamicIcon } from "./DynamicIcon";
import { Button, Grid, Menu, Paper, Popover, TextField } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";

const iconsFamily = [
    // { prefix: "Ai", import: Ai },
    // { prefix: "Bs", import: Bs },
    // { prefix: "Bi", import: Bi },
    // { prefix: "Di", import: Di },
    // { prefix: "Fi", import: Fi },
    // // { prefix: "Fc", import: Fc },
    // { prefix: "Fa", import: Fa },
    // { prefix: "Gi", import: Gi },
    // { prefix: "Go", import: Go },
    // { prefix: "Gr", import: Gr },
    // { prefix: "Hi", import: Hi },
    // { prefix: "Io", import: Io },
    // { prefix: "Io", import: Io5 },
    // { prefix: "Md", import: Md },
    // { prefix: "Ri", import: Ri },
    // // { prefix: "Si", import: Si },
    // { prefix: "Ti", import: Ti },
    // { prefix: "Vsc", import: Vsc },
    { prefix: "Cg", import: Cg },
]

var iconStrings = []
iconsFamily.forEach(iconFamily => {
    const icons = Object.keys(iconFamily.import)
    console.log(icons);
    icons.forEach(icon => iconStrings.push(iconFamily.prefix + "/" + icon))
});

var iconStrings = iconStrings.filter(function (str) { return str.toLowerCase().includes("smart".toLowerCase()) });

export function IconPicker({value, onChange, enableSearchBar = false, ...props}) {
    const [query, setQuery] = useState(null);
    const [filteredIcons, setFilteredIcons] = useState(iconStrings);
    const [typingTimer, setTypingTimer] = useState(null);
    const [doneTypingInterval, setDoneTypingInterval] = useState(2000);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
          setAnchorEl(event.currentTarget);
        }
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }

    const handleIconClick = (iconName) => {
        if (onChange) {
            onChange(iconName)
        }
    };

    const filterIcons = () => {

        if (query === "" || query === null) {
            setFilteredIcons(iconStrings)
        } else {
            var filtered = iconStrings.filter(function (str) { return str.toLowerCase().includes(query.toLowerCase()) });
            console.log(filtered); 
            setFilteredIcons(filtered)
        }
    };

    return (
        <Box sx={{display: "flex", alignItems: "center"}}>
            <Button variant="outlined" onClick={ev => handleClick(ev)} sx={{marginRight: "15px"}}>
                Icon Selector
            </Button>
            {
                value && (
                    <DynamicIcon size={30} icon={value}/>
                )
            }
            <Menu
                style={{marginTop: 1, width: "770px", borderRadius: 0}}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div style={{ padding: 20 }}>
                    {
                        enableSearchBar && (
                            <div style={{ marginBottom: 20 }}>
                                <TextField
                                    id="query"
                                    label=""
                                    value={query}
                                    style={{ width: "100%" }}
                                    // inputProps={{ style: { color: theme.palette.dashboard.card.contrast } }}
                                    onKeyDown={clearTimeout(typingTimer)}
                                    onKeyUp={() => {
                                        clearTimeout(typingTimer);
                                        setTypingTimer(setTimeout(filterIcons(), doneTypingInterval))
                                    }}
                                    onChange={(ev) => { setQuery(ev.target.value) }}
                                />
                            </div>
                        )
                    }
                    <Grid container gap={2}>
                        {filteredIcons.map((iconName) => {
                            return (
                                <Grid key={iconName} item xs="auto" sx={{padding: "10px", cursor: "pointer"}} container alighItems="center" justifyContent="center" onClick={() => { handleIconClick(iconName); handleClose() }} component={Paper}>
                                    <DynamicIcon icon={iconName} size={30}/> 
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </Menu>
        </Box>
    )
}
