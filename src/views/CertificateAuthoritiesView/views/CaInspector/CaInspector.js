import React, { useEffect, useState } from "react";
import casDuck from "redux/ducks/certificate-authorities";

import { Link, Outlet} from "react-router-dom";
import { Divider, Grid, IconButton, Tab, Tabs, Button, Typography, DialogContent, DialogContentText, Dialog, DialogActions, DialogTitle, Box, Skeleton } from "@mui/material"
import { LamassuChip } from "components/LamassuComponents/Chip";
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { connect } from "react-redux";
import { createLoader } from "components/utils";
import { useTheme } from "@emotion/react";
import { actionType, status } from "redux/utils/constants";

const CaInspector = ({refreshing, caData, urlCaInspectTab})=>{
    const theme = useTheme()
    const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(urlCaInspectTab)

    useEffect(()=>{
        setSelectedTab(urlCaInspectTab)
    }, [urlCaInspectTab])

    return (
        <Box style={{display: "flex", flexDirection: "column", height: "100%"}}>
            <Box style={{padding: "40px 40px 0 40px"}}>
                <Grid item container spacing={2} justifyContent="flex-start">
                    <Grid item xs={9}>
                        <Box style={{display: "flex", alignItems: "center"}}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={350} height={22} sx={{borderRadius: "5px"}}/>
                                ) : (
                                    <>
                                        <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px"}}>{caData.name}</Typography>
                                        <LamassuChip color={caData.key_metadata.strength_color} label={caData.key_metadata.strength} rounded/> 
                                        <LamassuChip color={caData.status_color} label={caData.status} rounded style={{marginLeft: "5px"}}/> 
                                    </>
                                )
                            }
                            </Box>
                    </Grid>
                    <Grid item xs={3} container justifyContent="flex-end">
                        <Grid item>
                            {
                                !refreshing && (
                                    <IconButton onClick={()=>setIsRevokeDialogOpen(true)} style={{background: theme.palette.error.light}}>
                                        <DeleteIcon style={{color: theme.palette.error.main}}/>
                                    </IconButton>
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item container spacing={2} justifyContent="flex-start" style={{marginTop: 0}}>
                    {
                        refreshing ? (
                            <Grid item sx={{marginTop: "0px"}}>
                                <Skeleton variant="rect" width={175} height={20} sx={{borderRadius: "5px"}}/>
                            </Grid>
                        ) : (
                            <>
                                <Grid item style={{paddingTop: 0}}>
                                    <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 13}}>#{`${caData.key_metadata.type} ${caData.key_metadata.bits}`}</Typography>
                                </Grid>
                                <Grid item style={{paddingTop: 0}}>
                                    <Box style={{display: "flex", alignItems: "center"}}>
                                        <AccessTimeIcon style={{color: theme.palette.text.secondary, fontSize: 15,marginRight: 5}}/>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13}}>{`Expiration date: ${moment(caData.valid_to).format("DD/MM/YYYY")}`}</Typography>
                                    </Box>
                                </Grid>
                            </>
                        )
                    }
                </Grid>
                <Box style={{marginTop: 15, position: "relative", left: "-15px"}}>
                    {
                        !refreshing && (
                            <Tabs value={selectedTab}>
                                <Tab component={Link} to={""} label="Overview" />
                                <Tab component={Link} to={"certs"} label="Issued Certificates" />
                                <Tab component={Link} to={"cloud-providers"} label="Cloud Providers" />
                            </Tabs>
                        ) 
                    }
                </Box>
            </Box>
            <Divider/>
            <Box style={{padding: 40, flexGrow: 1, overflowY: "auto", height: "500px"}}>
                    {
                        !refreshing && (
                            <Outlet />
                        )
                    }
            </Box>
            {
                !refreshing && (
                    <Dialog open={isRevokeDialogOpen} onClose={()=>setIsRevokeDialogOpen(false)}>
                        <DialogTitle>Revoke CA: {caData.name}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You are about to revoke a CA. By revoing the certificate, you will also revoke al issued certificates.
                            </DialogContentText>
                            <Grid container style={{marginTop: "10px"}}>
                                <Grid item xs={12}>
                                    <Typography variant="button">CA Name: </Typography>
                                    <Typography variant="button" style={{background: theme.palette.mode == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{caData.name}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="button">CA Serial Number: </Typography>
                                    <Typography variant="button" style={{background: theme.palette.mode == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{caData.serial_number}</Typography>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={()=>setIsRevokeDialogOpen(false)} variant="outlined">Cancel</Button>
                            <Button onClick={()=>setIsRevokeDialogOpen(false)} variant="contained">Revoke</Button>
                        </DialogActions>
                    </Dialog>
                )
            }
        </Box>
    )
}

const mapStateToProps = (state, {caName}) => {
    const reqInProgress = casDuck.reducer.isRequestInProgress(state); 
    return{
        refreshing : reqInProgress.status == status.PENDING && reqInProgress.actionType == actionType.READ,
        caData : casDuck.reducer.getCA(state, caName),
    }
  }

const mapDispatchToProps = (dispatch) => ({
    onMount: ()=>{ 
       //dispatch(casDuck.actions.getCAs()) 
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CaInspector));