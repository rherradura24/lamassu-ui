import { Typography, useTheme } from "@material-ui/core";
import { LamassuModal } from "./LamassuModal";
const LamassuModalCaRevocation = ({certId, certName, open, handleClose, handleRevocation}) => {
    const theme = useTheme();

    return (
        <LamassuModal 
            title={"Revoke CA: " + certName}
            warnIcon={true}
            msg={"You are about to revoke a CA. By revoing the certificate, you will also revoke al emmited certificates."}
            formContent={
                (<>
                    <div>
                        <Typography variant="button">Certificate Name: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{certName}</Typography>
                    </div>
                    <div>
                        <Typography variant="button">Certificate ID: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{certId}</Typography>
                    </div>
                </>)
            }
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Revoke",
                        primary: true,
                        disabledBtn: false,
                        onClick: handleRevocation
                    }
                ]
            }
        />
    )
}

export {LamassuModalCaRevocation}
