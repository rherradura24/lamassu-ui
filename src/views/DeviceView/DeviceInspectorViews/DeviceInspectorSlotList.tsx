import { Grid, Paper, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { Device } from "ducks/features/devices/models";
import { Certificate } from "@fidm/x509";
import React from "react";
import moment from "moment";
import { LamassuChip } from "components/LamassuComponents/Chip";

interface Props {
    deviceID: string,
    device: Device,
    activeCertIssuer: string | undefined,
    decodedCertificate: Certificate | undefined,
    onSlotClick: Function
}

export const DeviceInspectorSlotList: React.FC<Props> = ({ deviceID, device, activeCertIssuer, decodedCertificate, onSlotClick }) => {
    const theme = useTheme();

    return (
        <Box>
            <Grid container sx={{ padding: "20px" }} gap={4}>
                {
                    ["A", "B"].map((slot, idx) => {
                        return (
                            <Grid key={idx} item xs={4} container flexDirection={"column"} component={Paper} sx={{ padding: "20px", cursor: "pointer" }} onClick={() => { onSlotClick(slot); }}>
                                <Grid item xs sx={{ margin: "20px" }}>
                                    <Typography variant="h6" fontSize="25px" textAlign={"center"}>Slot {slot}</Typography>
                                    <Typography fontSize="12px" textAlign={"center"}>#{device.current_certificate.serial_number}</Typography>
                                </Grid>
                                <Grid item xs container spacing={8}>
                                    <Grid item xs container flexDirection="column" justifyContent={"center"} alignItems="center">
                                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Status</Typography>
                                        <LamassuChip label={device!.status} color={device!.status_color} compact/>
                                    </Grid>
                                    <Grid item xs container flexDirection="column" justifyContent={"center"} alignItems="center">
                                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>Expiration Date</Typography>
                                        {
                                            decodedCertificate
                                                ? (
                                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{moment(decodedCertificate!.validTo).format("DD-MM-YYYY HH:mm")}</Typography>
                                                )
                                                : (
                                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>-</Typography>
                                                )
                                        }
                                    </Grid>
                                    <Grid item xs container flexDirection="column" justifyContent={"center"} alignItems="center">
                                        <Typography style={{ color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14 }}>CA Name</Typography>
                                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "400", fontSize: 14 }}>{activeCertIssuer}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
};
