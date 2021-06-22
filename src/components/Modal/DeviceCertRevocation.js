import { TextField, Typography, useTheme } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import { LamassuModal } from "./LamassuModal";
import { isObject } from "highcharts";

const LamassuModalDeviceCertRevocation = ({deviceId, deviceName, open, handleSubmit, handleClose}) => {
    const theme = useTheme();

    return (
        <LamassuModal 
            title={"Revoke current device cert"}
            warnIcon={false}
            msg={"You are about to revoke the current device cert. Please, confirm to proceed."}
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
                        title: "Revoke Cert",
                        primary: true,
                        disabledBtn: false,
                        onClick: handleSubmit
                    }
                ]
            }
        />
    )
}

export {LamassuModalDeviceCertRevocation}
