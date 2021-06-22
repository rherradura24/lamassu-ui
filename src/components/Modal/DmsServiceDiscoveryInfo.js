import { Typography, useTheme } from "@material-ui/core";
import { LamassuModal } from "./LamassuModal";

const LamassuModalDmsServiceDiscoveryInfo = ({dmsId, open, handleClose}) => {
    const theme = useTheme();

    return (
        <LamassuModal 
            title={"DMS Service discovery configuration"}
            hasCloseButton={false}
            msg={"The DMS must be regisitered within Consul in order to issue new device certificates."}
            formContent={
                (<>
                    <div>
                        <Typography variant="button">Consul Service Identifier: </Typography>
                        <Typography variant="button" style={{background: theme.palette.type == "light" ? "#efefef" : "#666", padding: 5, fontSize: 12}}>{dmsId}</Typography>
                    </div>
                </>)
            }
            actions={
                [
                    {
                        title: "Close",
                        primary: true,
                        disabledBtn: false,
                        onClick: handleClose
                    }
                ]
            }
            open={open}
            handleClose={handleClose}
        />
    )
}

export {LamassuModalDmsServiceDiscoveryInfo}
