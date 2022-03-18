import React, { useState } from "react"

import { useTheme } from "@emotion/react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material"

import { connect } from "react-redux"
import { createLoader } from "components/utils"
import dmsEnrollerDuck from "redux/ducks/dms-enroller"

const DeclineDms = ({ dms, isOpen, onClose = () => {}, onDecline = {} }) => {
  const theme = useTheme()

  return (
        <Dialog open={isOpen} onClose={() => onClose()}>
            <DialogTitle>Decline DMS Enrollment: {dms.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to decline the enrollment of a new DMS instance. Please, confirm your action.
                </DialogContentText>
                <Grid container style={{ marginTop: "10px" }}>
                    <Grid item xs={12}>
                        <Typography variant="button">DMS Name: </Typography>
                        <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{dms.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="button">DMS ID: </Typography>
                        <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{dms.id}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} variant="outlined">Cancel</Button>
                <Button onClick={() => { onDecline(dms.id); onClose() }} variant="contained">Decline</Button>

            </DialogActions>
        </Dialog>
  )
}

const mapStateToProps = (state, { dmsId }) => ({
  dms: dmsEnrollerDuck.reducer.getDmsById(state, dmsId)
})

const mapDispatchToProps = (dispatch, { dmsId }) => ({
  onMount: () => {
  },

  onDecline: (dmsId) => { dispatch(dmsEnrollerDuck.actions.declineDmsRequest(dmsId)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(DeclineDms))
