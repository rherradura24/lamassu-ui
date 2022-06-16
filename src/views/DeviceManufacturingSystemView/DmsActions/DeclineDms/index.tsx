import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography, useTheme } from "@mui/material";

import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import * as dmsSelector from "ducks/features/dms-enroller/reducer";
import * as dmsAction from "ducks/features/dms-enroller/actions";

interface Props {
    dmsID: string,
    isOpen: boolean,
    onClose: any
}

export const DeclineDMS: React.FC<Props> = ({ dmsID, isOpen, onClose = () => { } }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const dms = useAppSelector((state) => dmsSelector.getDMS(state, dmsID)!);

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
                    <Grid item xs={12}>
                        <Typography variant="button">DMS ID: </Typography>
                        <Typography variant="button" style={{ background: theme.palette.background.darkContrast, padding: 5, fontSize: 12 }}>{dms.id}</Typography>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} variant="outlined">Cancel</Button>
                <Button onClick={() => { dispatch(dmsAction.declineDMSRequestAction.request({ dmsID: dmsID, status: "DENIED" })); onClose(); }} variant="contained">Decline</Button>
            </DialogActions>
        </Dialog>
    );
};
