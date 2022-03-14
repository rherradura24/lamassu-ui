import React, { useState } from "react"

import { useTheme } from "@emotion/react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material"

import { connect } from "react-redux";
import { createLoader } from "components/utils";
import dmsEnrollerDuck from "redux/ducks/dms-enroller";

const RevokeDms = ({dms, isOpen, onClose=()=>{}, onRevoke={}}) => {
    const theme = useTheme()

    return (
        <Dialog open={isOpen} onClose={()=>onClose()}>
            <DialogTitle>Decline DMS Enrollment: {dms.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                You are about to revoke a DMS. The previously issued certificate will be invalidated and no devices will no longer be able to enroll through it. Please, confirm your action.
                </DialogContentText>
                <Grid container style={{marginTop: "10px"}}>
                    <Grid item xs={12}>
                        <Typography variant="button">DMS Name: </Typography>
                        <Typography variant="button" style={{background: theme.palette.background.darkContrast, padding: 5, fontSize: 12}}>{dms.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="button">DMS ID: </Typography>
                        <Typography variant="button" style={{background: theme.palette.background.darkContrast, padding: 5, fontSize: 12}}>{dms.id}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>onClose()} variant="outlined">Cancel</Button>
                <Button onClick={()=>{onRevoke(dms.id); onClose()}} variant="contained">Revoke</Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (state, {dmsId}) => ({
  dms : dmsEnrollerDuck.reducer.getDmsById(state, dmsId)
})

const mapDispatchToProps = (dispatch, {dmsId}) => ({
   onMount: ()=>{ 

   },
   
   onRevoke: (dmsId)=>{dispatch(dmsEnrollerDuck.actions.revokeDmsRequest(dmsId))}
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(RevokeDms));