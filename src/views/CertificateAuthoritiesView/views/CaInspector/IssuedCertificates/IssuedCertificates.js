import React from "react"
import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, LinearProgress, Paper, Typography } from "@mui/material"
import { LamassuChip } from "components/LamassuComponents/Chip"
import { LamassuTable } from "components/LamassuComponents/Table"
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";

export const IssuedCertificates = ({refreshing, certificates}) => {
    console.log(refreshing, certificates);
    const theme = useTheme()

    const certTableColumns = [
        {key: "serialNumber", title: "Serial Number", align: "start", size: 4},
        {key: "commonName", title: "Common Name", align: "start", size: 3},
        {key: "keyStrength", title: "Key Strength", align: "center", size: 1},
        {key: "certificateStatus", title: "Certificate Status", align: "center", size: 1},
        {key: "certificateExpiration", title: "Certificate Expiration", align: "center", size: 2},
        {key: "actions", title: "", align: "end", size: 2},
    ]

    const certificatesRenderer = certificates.map(cert => {
        return {
            serialNumber: <Typography style={{fontWeight: "700", fontSize: 13, color: theme.palette.text.primary}}>#{cert.serial_number}</Typography>,
            commonName: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, overflowWrap: "break-word", width: "100%"}}>{cert.subject.common_name}</Typography>,

            keyStrength: (
                <LamassuChip label={cert.key_metadata.strength} color={cert.key_metadata.strength_color}/>
            ), 
            certificateStatus:(
                <LamassuChip label={cert.status} color={cert.status_color}/>
            ), 
            certificateExpiration: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{moment(cert.valid_to).format("DD-MM-YYYY HH:mm")}</Typography>,
            actions: (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35}}>
                                <IconButton>
                                    <VisibilityIcon fontSize={"small"}/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35}}>
                                <IconButton>
                                    <FileDownloadRoundedIcon fontSize={"small"}/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35}}>
                                <IconButton>
                                    <DeleteIcon fontSize={"small"}/>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ),
        }
    })

    return(
        <>
            {
                refreshing == true && (
                    <Box sx={{width: "100%", height: "10px", marginBottom: "20px"}}>
                        <LinearProgress />
                    </Box>
                )

            }
            <LamassuTable columnConf={certTableColumns} data={certificatesRenderer} />
        </>
        
    )
}