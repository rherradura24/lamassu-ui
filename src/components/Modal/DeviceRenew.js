import { Box, Button, Paper, Tab, TextField, Typography, useTheme } from "@material-ui/core";
import { Autocomplete, TabContext, TabList, TabPanel } from "@material-ui/lab";
import { useRef, useState } from "react";
import { LamassuModal } from "./LamassuModal";
import { MenuSeparator } from "views/Dashboard/SidebarMenuItem";

const LamassuModalDeviceRenew = ({device, open, handleSubmit, handleClose}) => {
    const theme = useTheme();
    const [dmsApiUrl, setDmsApiUrl] = useState("https://"+window.location.hostname+":5000")

    return (
        <LamassuModal 
            title={"Renew Device Cert"}
            warnIcon={false}
            msg={"You are about to renew a device certificate. By renewing a device certificate, you will revoke the current one"}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Renew",
                        primary: true,
                        onClick: ()=>{handleSubmit(device.id, dmsApiUrl)}
                    }
                ]
            }
            formContent={
                (<>
                    <TextField required={true} error={dmsApiUrl==""} disabled={true} margin="dense" id="DMSAPIURL" label="DMS API URL" fullWidth value={dmsApiUrl} onChange={ev=>{setDmsApiUrl(ev.target.value)}}/>
                    <Box>
                        <div style={{marginTop: 20}}>
                            <Typography variant="button">Device Alias: </Typography>
                            <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{device.alias}</Typography>
                        </div>
                        <div>
                            <Typography variant="button">Device UUID: </Typography>
                            <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{device.id}</Typography>
                        </div>
                    </Box>
                </>)
            }
            
        />
    )
}

export {LamassuModalDeviceRenew}
