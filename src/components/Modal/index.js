import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const LamassuModal = ({title, msg, open, handleClose}) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
            <Box style={{display: "flex", alignItems: "center"}}>
                <InfoIcon color="primary" style={{marginRight: 10}} />
                {title}
            </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained" autoFocus>
            Revoke
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export {LamassuModal}