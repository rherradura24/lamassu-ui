import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Button, makeStyles, Paper, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';

const LamassuModal = ({title, warnIcon, msg, open, formContent, handleClose, actions = [{title: "OK", primary: true, disabledBtn: false, onClick: ()=>{}}] }) => {

    return (
        <Dialog
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" >
            <Box style={{display: "flex", alignItems: "center"}}>
                {
                    warnIcon && ( <InfoIcon color="primary" style={{marginRight: 10}} /> )
                }
                {title}
            </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
          {
              formContent && (
                formContent
              )
          }
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary" >
                Close
            </Button>
            {
                actions.map(action => {
                    const params = action.primary ? {variant: "contained", autoFocus: true} : {} ;
                    return action.disabledBtn ? (
                        <Button onClick={action.onClick} disabled color="primary" {...params} key={action.title} >
                            {action.title}
                        </Button>
                    ) : (
                        <Button onClick={action.onClick} color="primary" {...params} key={action.title} >
                            {action.title}
                        </Button>
                    )
                })
            }
        </DialogActions>
      </Dialog>
    )
}

export {LamassuModal}