import { Box, Button, Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Switch, TextField, Tooltip, Typography, useTheme } from "@material-ui/core";
import { useRef, useState } from "react";
import { LamassuModal } from "./LamassuModal";
import { MenuSeparator } from "views/Dashboard/SidebarMenuItem";
import downloadFile from "utils/FileDownloader";
import GetAppIcon from '@material-ui/icons/GetApp';

const LamassuModalDmsCreationPrivKeyResponse = ({open, handleClose, handleSubmit, dmsId, dmsName, privKey}) => {
    const theme = useTheme();

    const handleDownload = () =>{
        downloadFile("DMS-"+dmsName+".key", privKey)
    }

    return (
        <LamassuModal 
            hasCloseButton={false}
            title={"Private Key"}
            warnIcon={true}
            msg={"Download the private key. Once you close this window, the key will not be recoverable"}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "OK",
                        primary: true,
                        onClick: ()=>{
                            handleSubmit()
                        }
                    }
                ]
            }
            formContent={
                <>
                    <div>
                        <Typography variant="button">Device Manufacturing System Name: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{dmsName}</Typography>
                    </div>
                    <div>
                        <Typography variant="button">Device Manufacturing System ID: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{dmsId}</Typography>
                    </div>
                    <Box style={{marginTop: 20}}>
                        <Button variant="contained" color="primary" onClick={handleDownload}>Download Private Key</Button>
                    </Box>
                </>
            }
        />
    )
}

export {LamassuModalDmsCreationPrivKeyResponse}
