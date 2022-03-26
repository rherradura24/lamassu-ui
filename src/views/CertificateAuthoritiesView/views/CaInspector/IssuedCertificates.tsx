import React, { useEffect } from "react";
import { Box, Grid, IconButton, Paper, Skeleton, Typography } from "@mui/material";
import { LamassuChip } from "components/LamassuComponents/Chip";
import { LamassuTable } from "components/LamassuComponents/Table";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import * as caActions from "ducks/features/cas/actions";
import * as caSelector from "ducks/features/cas/reducer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import { useTheme } from "@mui/system";

interface Props {
    caName: string
}
export const IssuedCertificates: React.FC<Props> = ({ caName }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const requestStatus = useAppSelector((state) => caSelector.getIssuedCertsRequestStatus(state));
    const certificates = useAppSelector((state) => caSelector.getIssuedCerts(state, caName))!;

    useEffect(() => {
        dispatch(caActions.getIssuedCertsActions({ caName: caName }));
    }, []);

    const certTableColumns = [
        { key: "serialNumber", title: "Serial Number", align: "start", size: 4 },
        { key: "commonName", title: "Common Name", align: "start", size: 3 },
        { key: "keyStrength", title: "Key Strength", align: "center", size: 1 },
        { key: "certificateStatus", title: "Certificate Status", align: "center", size: 1 },
        { key: "certificateExpiration", title: "Certificate Expiration", align: "center", size: 2 },
        { key: "actions", title: "", align: "end", size: 2 }
    ];

    const certificatesRenderer = certificates.map(cert => {
        return {
            serialNumber: <Typography style={{ fontWeight: "500", fontSize: 13, color: theme.palette.text.primary }}>#{cert.serial_number}</Typography>,
            commonName: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, overflowWrap: "break-word", width: "100%" }}>{cert.subject.common_name}</Typography>,

            keyStrength: (
                <LamassuChip label={cert.key_metadata.strength} color={cert.key_metadata.strength_color} />
            ),
            certificateStatus: (
                <LamassuChip label={cert.status} color={cert.status_color} />
            ),
            certificateExpiration: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary }}>{moment(cert.valid_to).format("DD-MM-YYYY HH:mm")}</Typography>,
            actions: (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                                <IconButton>
                                    <VisibilityIcon fontSize={"small"} />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                                <IconButton>
                                    <FileDownloadRoundedIcon fontSize={"small"} />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                                <IconButton>
                                    <DeleteIcon fontSize={"small"} />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )
        };
    });

    return (
        <>
            {
                requestStatus.isLoading
                    ? (
                        <Box sx={{ width: "100%", marginBottom: "20px" }}>
                            <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                            <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                            <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                        </Box>
                    )
                    : (
                        certificates.length > 0
                            ? (
                                <LamassuTable columnConf={certTableColumns} data={certificatesRenderer} />
                            )
                            : (
                                <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }}>
                                    <Grid item xs="auto" container justifyContent={"center"} alignItems={"center"} flexDirection="column">
                                        <img src={process.env.PUBLIC_URL + "/assets/icon-faulttolerance.png"} height={150} style={{ marginBottom: "25px" }} />
                                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 22, lineHeight: "24px", marginRight: "10px" }}>
                                            Start Issuing certificates
                                        </Typography>

                                        <Typography>To Issue certificates, enroll your devices through your DMS</Typography>
                                    </Grid>
                                </Grid>
                            )
                    )
            }
        </>

    );
};
