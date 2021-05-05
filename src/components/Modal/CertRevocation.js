import { LamassuModal } from "./LamassuModal";
const LamassuModalCertRevocation = ({certId, open, handleClose, handleRevocation}) => {
    return (
        <LamassuModal 
            title={"Revoke CA: " + certId}
            warnIcon={true}
            msg={"You are about to revoke a CA. By revoing the certificate, you will also revoke al emmited certificates."}
            open={open}
            handleClose={handleClose}
            actions={
                [
                    {
                        title: "Revoke",
                        primary: true,
                        onClick: handleRevocation
                    }
                ]
            }
        />
    )
}

export {LamassuModalCertRevocation}
