import React, { useState } from "react"

import { useTheme } from "@emotion/react"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Skeleton, Typography } from "@mui/material"

import { connect } from "react-redux";
import { createLoader } from "components/utils";
import dmsEnrollerDuck from "redux/ducks/dms-enroller";
import casDuck from "redux/ducks/certificate-authorities";
import { status } from "redux/utils/constants";
import { LamassuSwitch } from "components/LamassuComponents/Switch";
import { LamassuTable } from "components/LamassuComponents/Table";
import { LamassuChip } from "components/LamassuComponents/Chip";

const ApproveDms = ({dms, refreshingCaList, caList, isOpen, onClose=()=>{}, onApprove={}}) => {
    const theme = useTheme()
    const [selectedCas, setSelectedCas] = useState([])

    const casTableColumns = [
        {key: "actions", title: "", align: "start", size: 1},
        {key: "name", title: "Name", align: "center", size: 2},
        {key: "serialnumber", title: "Serial Number", align: "center", size: 3},
        {key: "status", title: "Status", align: "center", size: 1},
        {key: "keystrength", title: "Key Strength", align: "center", size: 1},
        {key: "keyprops", title: "Key Properties", align: "center", size: 1},
    ]

    const casRender = caList.map(ca => {
        return {
            actions:  <LamassuSwitch value={selectedCas.includes(ca.name)} onChange={()=>{
                setSelectedCas(prev=>{
                    if (prev.includes(ca.name)){
                        prev.splice(prev.indexOf(ca.name), 1)
                    } else {
                        prev.push(ca.name)
                    }
                    return prev
                })
            }}/>,
            name: <Typography style={{fontWeight: "500", fontSize: 14, color: theme.palette.text.primary}}>{ca.name}</Typography>,
            serialnumber: <Typography style={{fontWeight: "500", fontSize: 14, color: theme.palette.text.primary}}>{ca.serial_number}</Typography>,
            status: <LamassuChip label={ca.status} color={ca.status_color} />,
            keystrength: <LamassuChip label={ca.key_metadata.strength} color={ca.key_metadata.strength_color} />,
            keyprops: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center"}}>{`${ca.key_metadata.type} ${ca.key_metadata.bits}`}</Typography>,
        }
    })


    return (
        <Dialog open={isOpen} onClose={()=>onClose()} maxWidth={"xl"}>
            <DialogTitle>Approve DMS Enrollment: {dms.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are about to approve the enrollment of a new DMS instance. The DMS will only be able to enroll devices with the selectes CAs from below. Please, select the enrollable CAs granted to this DMS and confirm your action.
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
                <Grid item xs={12} container sx={{marginTop: "20px"}}>
                    {
                        refreshingCaList.status === status.SUCCEEDED ? (
                            <LamassuTable columnConf={casTableColumns} data={casRender} />
                        ) : (
                            <>
                                <Skeleton variant="rect" width={"100%"} height={25} sx={{borderRadius: "5px", marginBottom: "20px"}} />
                                <Skeleton variant="rect" width={"100%"} height={25} sx={{borderRadius: "5px", marginBottom: "20px"}} />
                                <Skeleton variant="rect" width={"100%"} height={25} sx={{borderRadius: "5px", marginBottom: "20px"}} />
                            </>
                        )
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>onClose()} variant="outlined">Cancel</Button>
                <Button onClick={()=>onClose()} variant="contained">Approve</Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = (state, {dmsId}) => ({
  dms : dmsEnrollerDuck.reducer.getDmsById(state, dmsId),
  caList: casDuck.reducer.getCAs(state),
  refreshingCaList: casDuck.reducer.isRequestInProgress(state)
})

const mapDispatchToProps = (dispatch, {dmsId}) => ({
   onMount: ()=>{ 
        dispatch(casDuck.actions.getCAs())
   },
   
   onApprove: ()=>{}
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(ApproveDms));