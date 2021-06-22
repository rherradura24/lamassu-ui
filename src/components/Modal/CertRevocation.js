import { Typography, useTheme } from "@material-ui/core";
import { LamassuModal } from "./LamassuModal";
const LamassuModalCertRevocation = ({issuerCaName, certId, certCommonName, open, handleClose, handleRevocation}) => {
    const theme = useTheme();

    return (
        <LamassuModal 
            title={"Revoke Certificate" }
            warnIcon={true}
            msg={"You are about to revoke the following certificate."}
            formContent={
                (<>
                    <div>
                        <Typography variant="button">Issuer CA Name: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{issuerCaName}</Typography>
                    </div>
                    <div>
                        <Typography variant="button">Certificate common name: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{certCommonName}</Typography>
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

export {LamassuModalCertRevocation}
