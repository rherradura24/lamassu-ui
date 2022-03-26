import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

const getColor = (theme: any, color: string) => {
    switch (color) {
    case "green":
        return [theme.palette.success.main, theme.palette.success.light];

    case "orange":
        return [theme.palette.warning.main, theme.palette.warning.light];

    case "red":
        return [theme.palette.error.main, theme.palette.error.light];

    case "gray":
        return [theme.palette.text.main, theme.palette.background.lightContrast];

    default:
        if (color !== undefined) {
            return color;
        }
        return [theme.palette.text.main, theme.palette.background.lightContrast];
    }
};

interface LamassuChipProps {
  color: string,
  label: string,
  rounded?: boolean,
  compact?: boolean,
  bold?: boolean,
  compactFontSize?: boolean,
  style?: any,
  [x: string]: any,
}
export const LamassuChip: React.FC<LamassuChipProps> = ({ color, label, rounded, compact = false, bold = false, compactFontSize = false, style = {}, ...props }) => {
    const theme = useTheme();
    const colors = getColor(theme, color);
    return (

        <Box style={{ background: colors[1], borderRadius: rounded ? 15 : 5, padding: compact ? "3px" : "5px 7px 5px 7px", width: "fit-content", display: "flex", justifyContent: "center", alignItems: "center", ...style }} {...props}>
            <Typography style={{ color: colors[0], fontWeight: bold ? "600" : "400", fontSize: compactFontSize ? 10 : 12 }}>{label}</Typography>
        </Box>
    );
};

interface LamassuStatusChipProps {
  color: string,
  label: string,
  style: any,
  [x: string]: any,
}
export const LamassuStatusChip: React.FC<LamassuStatusChipProps> = ({ color, label, style = {}, ...props }) => {
    const theme = useTheme();
    const colors = getColor(theme, color);
    return (
        <Box style={{ background: colors[1], borderRadius: 5, marginLeft: 10, padding: "5px 7px 5px 7px", width: "fit-content", display: "flex", justifyContent: "center", alignItems: "center", ...style }} {...props}>
            <Box style={{ marginRight: 10, width: 7, height: 7, background: colors[0], borderRadius: "50%" }} />
            <Typography style={{ color: colors[0], fontWeight: "400", fontSize: 12 }}>{label}</Typography>
        </Box>
    );
};
