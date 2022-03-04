import { darkScrollbar } from "@mui/material"

export const light = {
    palette: {
        mode: "light",
        primary: {
            light: "#d7ebff",
            main: "#0068D1",
            dark: "#1F528F"
        },
        secondary: {
            light: "#70A8EB",
            main: "#0068D1",
            dark: "#1F528F"
        },
        success:{
            light: "#e3f8ef",
            main: "#5CA36B",
            dark: "#2F6140"
        },
        warning:{
            light: "#FFF0C0",
            main: "#F3A83B",
            dark: "#907057"
        },
        error:{
            light: "#FCE5E8",
            main: "#da565f",
            dark: "#8C3239"
        },
        gray:{
            light: "#EFF0F2",
            main: "#9FA0A1",
            dark: "#6A6A6B"
        }, 
        scrollbar: {
            thumb: "#555555",
            track: "#EEEEEE"
        },
        divider: "#EFF0F2",
        text:{
            primary: "#333",
            primaryLight: "#5C5F68",
            secondary: "#999eaa",
        },
        background: {
            paper: "#fff",
            default: "#fff",
            lightContrast: "#eff0f2", // f1f1f1
            darkContrast:  "#D4D4D4"
        }
    },    
}

export const dark = {
    palette: {
        mode: "dark",
        primary: {
            light: "#4a6952",
            main: "#25ee32", //2099C6
            dark: "#2F6140"
        },
        secondary: {
            light: "#222",
            main: "#222",
            dark: "#333"
        },
        success:{
            light: "#4a6952",
            main: "#25ee32",
            dark: "#2F6140"
        },
        warning:{
            light: "#635d55",
            main: "#F3A83B",
            dark: "#907057"
        },
        error:{
            light: "#6d504e",
            main: "#da565f",
            dark: "#8C3239"
        },
        gray:{
            light: "#666",
            main: "#555555",
            dark: "#9FA0A1"
        }, 
        scrollbar: {
            thumb: "#EEEEEE",
            track: "#555555"
        },
        divider: "#444",
        text:{
            primary: "#bbb",
            primaryLight: "#fff",
            secondary: "#aaa",
        },
        background: {
            paper: "#333",
            default: "#333",
            lightContrast: "#444", // f1f1f1
            darkContrast:  "#4f4f4f"
        }
    }
}