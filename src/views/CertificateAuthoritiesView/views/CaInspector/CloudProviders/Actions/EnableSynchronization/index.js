import React, { useState } from "react"

import { useTheme } from "@emotion/react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@mui/material"

import { connect } from "react-redux";
import { createLoader } from "components/utils";
import cloudProxyDuck from "redux/ducks/cloud-proxy";
import casDuck from "redux/ducks/certificate-authorities";

const EnabledConnectorSynchronization = ({ caName, caCert, caSerialNumber, connector, isOpen, onClose = () => { }, onSync = {} }) => {
    const theme = useTheme()

    return (
        isOpen ? (
            <Dialog open={isOpen} onClose={() => onClose()} style={{ backgroundColor: 'transparent' }}>
                <DialogTitle>Enable synchronization for connector: {connector.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to enable the synchronization between this connector and the selected CA. Please, confirm your action.
                    </DialogContentText>
                    <Grid container style={{ marginTop: "10px" }}>
                        <Grid item xs={12}>
                            <Typography variant="button">Connector Name: </Typography>
                            <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{connector.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="button">Connector ID: </Typography>
                            <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{connector.id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="button">CA Name: </Typography>
                            <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{caName}</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()} variant="outlined">Cancel</Button>
                    <Button onClick={() => { onSync(connector.id, caName, caCert, caSerialNumber); onClose() }} variant="contained">Synchronize</Button>

                </DialogActions>
            </Dialog>
        ) : (
            <></>
        )
    )
}

const mapStateToProps = (state, { caName, connectorId }) => ({
    connector: cloudProxyDuck.reducer.getCloudConnectorById(state, connectorId),
    caCert: casDuck.reducer.getCA(state, caName).certificate.pem_base64,
    caSerialNumber: casDuck.reducer.getCA(state, caName).serial_number
})

const mapDispatchToProps = (dispatch, { }) => ({
    onMount: () => {
    },
    onSync: (connectorId, caName, caCert, caSerialNumber) => { dispatch(cloudProxyDuck.actions.forceSynchronizeCloudConnector(connectorId, caName, caCert, caSerialNumber)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(EnabledConnectorSynchronization));