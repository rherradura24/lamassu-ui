import { Button, Divider, Grid, Paper, Typography } from "@mui/material"
import { AiOutlineProfile } from "react-icons/ai";
import ErrorIcon from '@mui/icons-material/Error';
import { useTheme } from "@emotion/react";
import { LamassuChip } from "components/LamassuComponents/Chip";
import { dmsStatus } from "redux/ducks/dms-enroller/Constants";
import { Box } from "@mui/system";

export const DmsCard = ({name, status, statusColor, serialNumber, subject, requestDate, expirationDate, emmitedCerts}) => {
    const theme = useTheme()
    return(
        <Box container component={Paper} style={{borderRadius: 5, borderTop: `3px solid ${theme.palette.primary.main}`, display: "flex", flexDirection: "column"}}>
            <Box sx={{padding: "5px 20px", width: "calc(100% - 40px)"}}>
                <Grid container>
                    <Grid item xs={6} container alignItems="center">
                        <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 16, lineHeight: "24px"}}>{name}</Typography>
                    </Grid>
                    <Grid item xs={6} container alignItems="end" justifyContent={"flex-end"} direction="column">
                        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 12}}>Status</Typography>
                            <LamassuChip label={status} color={statusColor} rounded={true}  compactFontSize/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Divider/>
            </Box>
            <Box sx={{height: "100%", display: "flex", flexDirection: "column"}}>
                <Box item container style={{padding: "5px 20px"}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="button" style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 12, lineHeight: "24px"}}>Certificate Subject</Typography>
                        </Grid>
                        <Grid item xs={12} container alignItems={"center"}>
                            <Typography style={{marginLeft: 5, color: theme.palette.text.primary, fontWeight: "500", fontSize: 12, lineHeight: "24px"}}>{subject}</Typography>

                        </Grid>
                    </Grid>
                    {
                        status !== dmsStatus.PENDING  && status !== dmsStatus.REJECTED && (
                            <Grid item xs={12} container>
                                <Grid item xs={12}>
                                    <Typography variant="button" style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 12, lineHeight: "24px"}}>Serial Number</Typography>
                                </Grid>
                                <Grid item xs={12} container alignItems={"center"}>
                                    <Typography style={{marginLeft: 5, color: theme.palette.text.primary, fontWeight: "500", fontSize: 12, lineHeight: "24px"}}>{serialNumber}</Typography>
                                </Grid>
                            </Grid>
                        )
                    }
                    {
                        status === dmsStatus.APPROVED && (
                            <Grid item xs={12} container spacing={2}>
                                <Grid item xs={6} container>
                                    <Grid item xs={12}>
                                        <Typography variant="button" style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 12, lineHeight: "24px"}}>Expires</Typography>
                                    </Grid>
                                    <Grid item xs={12} container alignItems={"center"}>
                                        <ErrorIcon style={{color: theme.palette.warning.main, fontSize: 20}}/>
                                        <Typography style={{marginLeft: 5, color: theme.palette.text.primary, fontWeight: "500", fontSize: 14, lineHeight: "24px"}}>{expirationDate}</Typography>

                                    </Grid>
                                </Grid>
                                <Grid item xs={6} container>
                                    <Grid item xs={12}>
                                        <Typography variant="button" style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 12, lineHeight: "24px"}}>Emmited Certs</Typography>
                                    </Grid>
                                    <Grid item xs={12} container alignItems={"center"}>
                                        <AiOutlineProfile size={20} color={theme.palette.success.main}/>
                                        <Typography style={{marginLeft: 5, color: theme.palette.text.primary, fontWeight: "500", fontSize: 14, lineHeight: "24px"}}>{emmitedCerts}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                </Box>
                <Box sx={{borderRadius: 1, padding: "10px 10px 10px 10px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                    <Grid container spacing={2}>
                        {
                            status === dmsStatus.PENDING ? (
                                <>
                                    <Grid item xs={6}>
                                        <Button variant="contained" fullWidth>Approve</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button variant="outlined" fullWidth>Reject</Button>
                                    </Grid>
                                </>
                            ) :( 
                                status === dmsStatus.APPROVED ? (
                                    <Grid item xs={12}>
                                        <Button variant="outlined" fullWidth>Revoke</Button>
                                    </Grid>
                                ) :(
                                    <></>
                                )

                            )
                        }
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}