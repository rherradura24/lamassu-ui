import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { LamassuChip } from "components/LamassuComponents/Chip";
import { LamassuTableWithDataController, OperandTypes } from "components/LamassuComponents/Table";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import * as caActions from "ducks/features/cas/actions";
import * as caSelector from "ducks/features/cas/reducer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import { useTheme } from "@mui/system";
import { Certificate } from "ducks/features/cas/models";
import { Modal } from "components/Modal";
import { materialLight, materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";

interface Props {
    caName: string
}
export const IssuedCertificates: React.FC<Props> = ({ caName }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const requestStatus = useAppSelector((state) => caSelector.getIssuedCertsRequestStatus(state));
    const certificates = useAppSelector((state) => caSelector.getIssuedCerts(state, caName))!;

    useEffect(() => {
        dispatch(caActions.getIssuedCertsActions.request({ caName: caName }));
    }, []);

    const [showCertificate, setShowCertificate] = useState<string | undefined>(undefined);

    const certTableColumns = [
        { key: "serialNumber", dataKey: "serial_number", query: true, title: "Serial Number", type: OperandTypes.string, align: "start", size: 4 },
        { key: "commonName", dataKey: "subject.common_name", query: true, title: "Common Name", type: OperandTypes.string, align: "start", size: 3 },
        { key: "keyStrength", dataKey: "key_metadata.strength", title: "Key Strength", type: OperandTypes.enum, align: "center", size: 1 },
        { key: "certificateStatus", dataKey: "status", title: "Certificate Status", type: OperandTypes.enum, align: "center", size: 1 },
        { key: "certificateExpiration", dataKey: "cert.valid_to", title: "Certificate Expiration", type: OperandTypes.date, align: "center", size: 2 },
        { key: "actions", title: "", align: "end", size: 2 }
    ];

    const renderCA = (cert: Certificate) => {
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
                                <IconButton onClick={() => { setShowCertificate(cert.serial_number); }}>
                                    <VisibilityIcon fontSize={"small"} />
                                </IconButton>
                            </Box>
                            <Modal
                                title=""
                                isOpen={showCertificate === cert.serial_number}
                                onClose={() => { setShowCertificate(undefined); }}
                                subtitle=""
                                actions={
                                    <Box>
                                        <Button onClick={() => { setShowCertificate(undefined); }}>Close</Button>
                                    </Box>
                                }
                                content={
                                    <SyntaxHighlighter language="json" style={theme.palette.mode === "light" ? materialLight : materialOceanic} customStyle={{ fontSize: 10, padding: 20, borderRadius: 10, width: "fit-content", height: "fit-content" }} wrapLines={true} lineProps={{ style: { color: theme.palette.text.primaryLight } }}>
                                        {window.atob(cert.certificate.pem_base64)}
                                    </SyntaxHighlighter>
                                }
                            />
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
    };

    return (
        <LamassuTableWithDataController
            columnConf={certTableColumns}
            data={certificates}
            renderDataItem={renderCA}
            invertContrast={true}
            isLoading={requestStatus.isLoading}
            emptyContentComponent={
                <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "100%" }}>
                    <Grid item xs="auto" container justifyContent={"center"} alignItems={"center"} flexDirection="column">
                        <img src={process.env.PUBLIC_URL + "/assets/icon-faulttolerance.png"} height={150} style={{ marginBottom: "25px" }} />
                        <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 22, lineHeight: "24px", marginRight: "10px" }}>
                            Start Issuing certificates
                        </Typography>

                        <Typography>To Issue certificates, enroll your devices through your DMS</Typography>
                    </Grid>
                </Grid>
            }
            withRefresh={() => { dispatch(caActions.getIssuedCertsActions.request({ caName: caName })); }}
            onChange={(ev: any) => { console.log("callback", ev); }}

        />
    );
};
