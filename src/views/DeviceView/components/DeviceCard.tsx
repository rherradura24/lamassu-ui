import React from "react";

import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import { DynamicIcon } from "components/IconDisplayer/DynamicIcon";
import { LamassuChip } from "components/LamassuComponents/Chip";
import { AiFillWarning } from "react-icons/ai";
import { Device } from "ducks/features/devices/models";
import { Certificate } from "@fidm/x509";
import moment from "moment";
import { getColor } from "components/utils/lamassuColors";

interface Props {
    device: Device
    [x: string]: any
}

export const DeviceCard: React.FC<Props> = ({ device, ...props }) => {
    const theme = useTheme();

    let alertColorBg = theme.palette.warning.light;
    let alertColorIcon = theme.palette.warning.main;

    let remainingDaysBeforeExpiration = -1;
    if (device.current_certificate.crt) {
        const parsedCert = Certificate.fromPEM(Buffer.from(window.atob(device.current_certificate.crt), "utf8"));
        const now = new Date();
        remainingDaysBeforeExpiration = moment(parsedCert.validTo).diff(moment(now), "days");
        console.log(remainingDaysBeforeExpiration);
    }

    if (remainingDaysBeforeExpiration < 30) {
        alertColorBg = theme.palette.warning.light;
        alertColorIcon = theme.palette.warning.main;
    } else if (remainingDaysBeforeExpiration < 10) {
        alertColorBg = theme.palette.error.light;
        alertColorIcon = theme.palette.error.main;
    } else {
        alertColorBg = getColor(theme, "gray")[1];
        alertColorIcon = getColor(theme, "gray")[0];
    }

    return (
        <Box component={Paper} sx={{ padding: "10px", minHeight: "120px", display: "flex", flexDirection: "column" }} {...props}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs="auto">
                        <Box component={Paper} sx={{ padding: "5px", background: device.icon_color, borderRadius: 2, width: 25, height: 25, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <DynamicIcon icon={device.icon_name} size={22} color="#fff" />
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography sx={{ fontWeight: "500", fontSize: "15px" }}>{`${device.alias}`}</Typography>
                        <Typography sx={{ fontSize: 12 }}>{`#${device.id}`}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: "5px" }}>
                    <Typography style={{ fontSize: 12 }}>{device.description}</Typography>
                </Grid>
                {
                    device.tags.length > 0 &&
                    (
                        <Grid item xs={12} container spacing={1} style={{ marginBottom: 10, marginTop: device.description === "" ? "5px" : 0 }}>
                            {
                                device.tags.map((tag: string, idx: number) => (
                                    <Grid item key={idx}>
                                        <LamassuChip color={theme.palette.mode === "dark" ? ["#EEE", "#555"] : ["#555", "#EEEEEE"]} label={tag} compact={true} compactFontSize />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    )
                }
            </Box>
            <Box>
                {
                    remainingDaysBeforeExpiration >= 0 && (
                        <Grid item xs={12} container justifyContent={"space-between"} sx={{ background: alertColorBg, borderRadius: 1, padding: "5px 10px 5px 10px" }}>
                            <Grid item container xs={9}>
                                {remainingDaysBeforeExpiration < 30 && (<AiFillWarning color={alertColorIcon} style={{ marginRight: "5px" }}/>)}
                                <Typography style={{ fontSize: 12, fontWeight: "bold" }}>Certificate Expiration</Typography>
                            </Grid>
                            <Grid item xs={3} container justifyContent={"flex-end"}>
                                <Typography style={{ fontSize: 12 }}>{`In ${remainingDaysBeforeExpiration} days`}</Typography>
                            </Grid>
                        </Grid>
                    )
                }
            </Box>
        </Box>
    );
};
