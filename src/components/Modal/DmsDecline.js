import { Typography, useTheme } from "@material-ui/core";
import { LamassuModal } from "./LamassuModal";

const LamassuModalDmsDecline = ({dmsName, dmsId, open, handleSubmit, handleClose}) => {
    const theme = useTheme();

    return (
        <LamassuModal 
            title={"Decline DMS Request: " }
            warnIcon={true}
            msg={"You are about to approve a new Device Manufacturing System. Please review the request and confirm"}
            formContent={
                (<>
                    <div>
                        <Typography variant="button">Device Manufacturing System Name: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{dmsName}</Typography>
                    </div>
                    <div>
                        <Typography variant="button">Device Manufacturing System ID: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{dmsId}</Typography>
                    </div>
                </>)
            }
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Decline",
                        primary: true,
                        disabledBtn: false,
                        onClick: handleSubmit
                    }
                ]
            }
        />
    )
}

export {LamassuModalDmsDecline}
