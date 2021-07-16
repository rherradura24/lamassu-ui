import { TextField, Typography, useTheme } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { LamassuModal } from "./LamassuModal";

const LamassuModalDeviceDelete = ({caList, deviceId, deviceName, open, handleSubmit, handleClose}) => {
    const theme = useTheme();

    return (
        <LamassuModal 
            title={"Delete Device"}
            warnIcon={false}
            msg={"You are about to delete an existing device. Please, review the information and confirm to proceed."}
            formContent={
                (<>
                    <div style={{marginTop: 20}}>
                        <Typography variant="button">Device Alias: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{deviceName}</Typography>
                    </div>
                    <div>
                        <Typography variant="button">Device UUID: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{deviceId}</Typography>
                    </div>
                </>)
            }
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Delete Device",
                        primary: true,
                        disabledBtn: false,
                        onClick: handleSubmit
                    }
                ]
            }
        />
    )
}

export {LamassuModalDeviceDelete}
