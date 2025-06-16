import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import EqualizerRoundedIcon from "@mui/icons-material/EqualizerRounded";

interface HomeCardProps {
    value: string | number;
    label: string;
    onClick: () => void;
    icon?: React.JSX.Element;
}

const HomeCard = ({ value, label, onClick, icon }: HomeCardProps) => {
    const theme = useTheme();

    const handleOnClick = () => {
        onClick();
    };

    return (
        <Box
            component={Paper}
            onClick={handleOnClick}
            style={{
                marginTop: 10,
                background: theme.palette.common.white,
                padding: 15,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                minHeight: 80,
                borderRadius: 5
            }}
        >
            <Box>
                <Typography style={{ color: theme.palette.common.black, fontSize: 25, fontWeight: "bold" }}>{value}</Typography>
                <Typography style={{ color: theme.palette.common.black, fontSize: 15 }}>{label}</Typography>
            </Box>
            <Box>
                <Box
                    style={{
                        borderRadius: 50,
                        width: 50,
                        height: 50,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    {icon ?? <EqualizerRoundedIcon style={{ fontSize: 35, color: theme.palette.primary.main }} /> }
                </Box>
            </Box>
        </Box>
    );
};

export default HomeCard;
