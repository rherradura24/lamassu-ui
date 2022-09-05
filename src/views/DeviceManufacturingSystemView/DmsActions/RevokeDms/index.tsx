import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, useTheme } from "@mui/material";

import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import * as dmsSelector from "ducks/features/dms-enroller/reducer";
import * as dmsAction from "ducks/features/dms-enroller/actions";

interface Props {
    dmsName: string,
    isOpen: boolean,
    onClose: any
}

export const RevokeDMS: React.FC<Props> = ({ dmsName, isOpen, onClose = () => { } }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const dms = useAppSelector((state) => dmsSelector.getDMS(state, dmsName)!);

    return (
        <Dialog open={isOpen} onClose={() => onClose()} maxWidth={"xl"}>
            <DialogTitle>Decline DMS Enrollment Request: {dms.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to decline the enrollment request of a new DMS instance.
                </DialogContentText>
                <Grid container style={{ marginTop: "10px" }}>
                    <Grid item xs={12}>
                        <Typography variant="button">DMS Name: </Typography>
                        <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{dms.name}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} variant="outlined">Cancel</Button>
                <Button onClick={() => { dispatch(dmsAction.revokeDMSAction.request({ dmsName: dmsName, status: "REVOKED" })); onClose(); }} variant="contained">Revoke</Button>
            </DialogActions>
        </Dialog>
    );
};
