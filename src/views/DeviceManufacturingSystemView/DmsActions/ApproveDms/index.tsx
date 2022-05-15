import React, { useEffect, useState } from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Skeleton, Typography, useTheme } from "@mui/material";

import { LamassuSwitch } from "components/LamassuComponents/Switch";
import { LamassuTable } from "components/LamassuComponents/Table";
import { LamassuChip } from "components/LamassuComponents/Chip";
import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import * as caActions from "ducks/features/cas/actions";
import * as caSelector from "ducks/features/cas/reducer";
import { CertificateAuthority } from "ducks/features/cas/models";
import * as dmsSelector from "ducks/features/dms-enroller/reducer";
import * as dmsAction from "ducks/features/dms-enroller/actions";

interface Props {
  dmsID: string,
  isOpen: boolean,
  onClose: any
}

export const ApproveDms: React.FC<Props> = ({ dmsID, isOpen, onClose = () => {} }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const caRequestStatus = useAppSelector((state) => caSelector.getRequestStatus(state));
    const caList = useAppSelector((state) => caSelector.getCAs(state));
    const dms = useAppSelector((state) => dmsSelector.getDMS(state, dmsID)!);

    const [selectedCas, setSelectedCas] = useState<Array<string>>([]);

    useEffect(() => {
        dispatch(caActions.getCAsAction.request());
    }, []);

    const casTableColumns = [
        { key: "actions", title: "", align: "start", size: 1 },
        { key: "name", title: "Name", align: "center", size: 2 },
        { key: "serialnumber", title: "Serial Number", align: "center", size: 3 },
        { key: "status", title: "Status", align: "center", size: 1 },
        { key: "keystrength", title: "Key Strength", align: "center", size: 1 },
        { key: "keyprops", title: "Key Properties", align: "center", size: 1 }
    ];

    const casRender = (ca: CertificateAuthority) => {
        return {
            actions: <LamassuSwitch value={selectedCas.includes(ca.name)} onChange={() => {
                setSelectedCas(prev => {
                    if (prev.includes(ca.name)) {
                        prev.splice(prev.indexOf(ca.name), 1);
                    } else {
                        prev.push(ca.name);
                    }
                    return prev;
                });
            }}/>,
            name: <Typography style={{ fontWeight: "500", fontSize: 14, color: theme.palette.text.primary }}>{ca.name}</Typography>,
            serialnumber: <Typography style={{ fontWeight: "500", fontSize: 14, color: theme.palette.text.primary }}>{ca.serial_number}</Typography>,
            status: <LamassuChip label={ca.status} color={ca.status_color} />,
            keystrength: <LamassuChip label={ca.key_metadata.strength} color={ca.key_metadata.strength_color} />,
            keyprops: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{`${ca.key_metadata.type} ${ca.key_metadata.bits}`}</Typography>
        };
    };

    return (
        <Dialog open={isOpen} onClose={() => onClose()} maxWidth={"xl"}>
            <DialogTitle>Approve DMS Enrollment: {dms.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to approve the enrollment of a new DMS instance. The DMS will only be able to enroll devices with the selects CAs from below. Please, select the enrollable CAs granted to this DMS and confirm your action.
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
                <Grid item xs={12} container sx={{ marginTop: "20px" }}>
                    {
                        !caRequestStatus.isLoading
                            ? (
                                <LamassuTable columnConf={casTableColumns} data={caList} renderDataItem={casRender} />
                            )
                            : (
                                <>
                                    <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                    <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                    <Skeleton variant="rectangular" width={"100%"} height={25} sx={{ borderRadius: "5px", marginBottom: "20px" }} />
                                </>
                            )
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()} variant="outlined">Cancel</Button>
                <Button onClick={() => { dispatch(dmsAction.approveDMSRequestAction.request({ status: "APPROVED", dmsID: dms.id, authorized_cas: selectedCas })); onClose(); }} variant="contained">Approve</Button>
            </DialogActions>
        </Dialog>
    );
};
