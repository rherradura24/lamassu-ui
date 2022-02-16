import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import InfoIcon from '@mui/icons-material/Info';

const ModalBaseline = ({title, warnIcon, msg, open, formContent, handleClose, maxWidth="sm", hasCloseButton=true, actions = [{title: "OK", primary: true, disabledBtn: false, onClick: ()=>{}}] }) => {

    return (
        <Dialog
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
        >
        <DialogTitle>
            <Box style={{display: "flex", alignItems: "center"}}>
                {
                    warnIcon && ( <InfoIcon color="primary" style={{marginRight: 10}} /> )
                }
                {title}
            </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {msg}
          </DialogContentText>
          {
              formContent && (
                formContent
              )
          }
        </DialogContent>
        <DialogActions>
            { hasCloseButton && (
                <Button onClick={handleClose} color="primary" >
                    Close
                </Button>
            )}
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

export {ModalBaseline}
