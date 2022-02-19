
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
import { Button, Grid, Paper, Popover, TextField } from "@mui/material";
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

export function IconPicker(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [query, setQuery] = useState(null);
    const [filteredIcons, setFilteredIcons] = useState(iconStrings);
    const [open, setOpen] = useState(false);
    const [typingTimer, setTypingTimer] = useState(null);
    const [doneTypingInterval, setDoneTypingInterval] = useState(2000);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true)
    };

    const handleClose = () => {
        setAnchorEl(null)
        setOpen(false)
    };

    const onChange = (iconName) => {
        if (props.onChange) {
            props.onChange(iconName)
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
        <div>
            <Button variant="contained" onClick={ev => handleClick(ev)}>
                Icon Selector
            </Button>
            <Popover
                anchorPosition={{ top: 10, left: 10 }}
                onClose={() => handleClose()}
                open={open}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <div style={{ padding: 20 }}>
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
                    <Grid container spacing={2} columns={15}>
                        {filteredIcons.map((iconName) => {
                            return (
                                <Grid key={iconName} item xs={1} container alighItems="center" justifyContent="center" onClick={() => { onChange(iconName); handleClose() }} component={Paper}>
                                    <DynamicIcon icon={iconName} size={30}/> 
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </Popover>
        </div>
    )
}
