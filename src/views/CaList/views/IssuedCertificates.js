import { useTheme } from "@emotion/react"
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material"
import { LamassuChip } from "components/LamassuComponents/Chip"
import { LamassuTable } from "components/LamassuComponents/Table"
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

export const IssuedCertificates = ({certificates}) => {
    const theme = useTheme()

    const keyStrengthToColor = (keyStrength) => {
        switch (keyStrength) {
            case "High":
                return "green"
            case "Medium":
                return "orange"
            case "Low":
                return "red"
            default:
                return ""
        }
    }

    const certStatusToColor = (certificateStatus) => {
        switch (certificateStatus) {
            case "Active":
                return "green"
            case "Expired":
                return "red"
            default:
                return ""
        }
    }

    
    const certTableColumns = [
        {key: "serialNumber", title: "Serial Number", align: "start", size: 4},
        {key: "commonName", title: "Common Name", align: "center", size: 2},
        {key: "keyStrength", title: "Key Strength", align: "center", size: 1},
        {key: "certificateStatus", title: "Certificate Status", align: "center", size: 1},
        {key: "certificateExpiration", title: "Certificate Expiration", align: "center", size: 1},
        {key: "actions", title: "", align: "end", size: 2},

    ]
    const certificatesRenderer = certificates.map(cert => {
        return {
            serialNumber: <Typography style={{fontWeight: "700", fontSize: 13, color: theme.palette.text.primary}}>#{cert.serialNumber}</Typography>,
            commonName: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cert.commonName}</Typography>,

            keyStrength: (
                <LamassuChip label={cert.keyStrength} color={keyStrengthToColor(cert.keyStrength)}/>
            ), 
            certificateStatus:(
                <LamassuChip label={cert.certificateStatus} color={certStatusToColor(cert.certificateStatus)}/>
            ), 
            certificateExpiration: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cert.certificateExpiration}</Typography>,
            actions: (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40}}>
                                <IconButton>
                                    <VisibilityIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40}}>
                                <IconButton>
                                    <FileDownloadRoundedIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40}}>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ),
        }
    })
    return(
        <LamassuTable columnConf={certTableColumns} data={certificatesRenderer} />
    )
}