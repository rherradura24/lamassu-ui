import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, useTheme } from "@mui/material";
import { useAppSelector } from "ducks/hooks";
import * as caSelector from "ducks/features/cas/reducer";
import * as cloudProxySelector from "ducks/features/cloud-proxy/reducer";
import * as cloudProxyActions from "ducks/features/cloud-proxy/actions";
import { useDispatch } from "react-redux";

interface Props {
  caName: string
  connectorID: string
  isOpen: boolean,
  onClose: any
}
export const EnabledConnectorSynchronizationModal: React.FC<Props> = ({ caName, connectorID, isOpen, onClose }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const caData = useAppSelector((state) => caSelector.getCA(state, caName)!);
    const cloudConnector = useAppSelector((state) => cloudProxySelector.getCloudConnector(state, connectorID)!);

    return (
        isOpen
            ? (
                <Dialog open={isOpen} onClose={() => onClose()} style={{ backgroundColor: "transparent" }}>
                    <DialogTitle>Enable synchronization for connector: {cloudConnector.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
              You are about to enable the synchronization between this connector and the selected CA. Please, confirm your action.
                        </DialogContentText>
                        <Grid container style={{ marginTop: "10px" }}>
                            <Grid item xs={12}>
                                <Typography variant="button">Connector Name: </Typography>
                                <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{cloudConnector.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="button">Connector ID: </Typography>
                                <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{cloudConnector.id}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="button">CA Name: </Typography>
                                <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{caName}</Typography>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => onClose()} variant="outlined">Cancel</Button>
                        <Button onClick={() => { dispatch(cloudProxyActions.forceSynchronizeCloudConnectorAction.request({ caName: caName, connectorID: connectorID, caCetificate: caData.certificate.pem_base64, caSerialnumber: caData.serial_number })); onClose(); }} variant="contained">Synchronize</Button>
                    </DialogActions>
                </Dialog>
            )
            : (
                <></>
            )
    );
};
