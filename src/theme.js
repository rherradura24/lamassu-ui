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
            main: "#00E0FC",
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
            light: "#fff",
            main: "#EFF0F2",
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
        },
        appbar: "#0068D1"
    },    
}

export const dark = {
    palette: {
        mode: "dark",
        primary: {
            light: "#184d60",   //184d60    4a6952
            main: "#2099C6",    //2099C6    25ee32
            dark: "#104c63"     // 104c63   2F6140
        },
        secondary: {
            light: "#222",
            main: "#2099C6",
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
        divider: "#29414e",
        text:{
            primary: "#adbbc4",
            primaryLight: "#fff",
            secondary: "#e9ecef",
        },
        background: {
            paper: "#1b2a32",
            default: "#1b2a32",
            lightContrast: "#22343c", // f1f1f1
            darkContrast:  "#17242b"
        },
        appbar: "#0f171c"
    },
    components:{
        MuiPaper:{
            styleOverrides: {
                root: {
                    backgroundImage: "none"
                }
            }
        }
    }
}