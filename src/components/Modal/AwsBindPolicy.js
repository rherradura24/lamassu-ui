import { Box, TextField, Typography, useTheme } from "@material-ui/core";
import { useState } from "react";
import { LamassuModal } from "./LamassuModal";

export const LamassuModalAwsBindPolicy = ({open, handleClose, handleSubmit, caName}) => {
    const theme = useTheme();
    const [awsPolicy, setAwsPolicy] = useState("")

    const isJsonString = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const btnDisabled = awsPolicy == "" || !isJsonString(awsPolicy)

    return (
        <LamassuModal
            maxWidth={false}
            style={{width: 1100}}
            title={"Bind IoT Core Policy"}
            msg={"Define the policy granted to all devices having a valid certificate issued by the selected CA"}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Bind",
                        primary: true,
                        disabledBtn: btnDisabled,
                        onClick: ()=>{
                            handleSubmit(caName, awsPolicy)
                        }
                    }
                ]
            }
            formContent={
                <Box>
                    <Box>
                        <Typography variant="button">CA Name: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{caName}</Typography>
                    </Box>
                    <TextField
                        label="JSON Policy content"
                        multiline
                        rows={18}
                        inputProps={{style: {fontSize: 12, fontFamily: "monospace"}}}
                        style={{marginTop: 10}}
                        variant="outlined"
                        fullWidth
                        value={awsPolicy}
                        onChange={(ev)=>{setAwsPolicy(ev.target.value)}}
                    />
                </Box>
            }
        />
    )
}
