import { LamassuModalCaRevocation } from "./CaRevocation";
import { LamassuModalCertRevocation } from "./CertRevocation";
import { LamassuModalCaCreation } from "./CaCreation";
import { LamassuModalCertImport } from "./CertImport";
import { LamassuModalDmsCreation } from "./DmsCreation";
import { LamassuModalDmsApproval } from "./DmsApproval";
import { LamassuModalDmsDecline } from "./DmsDecline";
import { LamassuModalDmsRevoke } from "./DmsRevoke";
import { LamassuModalDmsCreationPrivKeyResponse } from "./DmsCreationPrivKeyResponse";
import { LamassuModalDeviceCreation } from "./DeviceCreation";

const LamassuModalPolyphormic = ({ type, open, handleClose, ...props }) =>{
    switch (type) {
      case "caRevoke":
        return (
          <LamassuModalCaRevocation 
            open={open} 
            handleClose={handleClose} 
            handleRevocation={props["handleRevocation"]} 
            certId={props["certId"]}
            certName={props["certName"]}
          />
        )
      
      case "certRevoke":
        return (
          <LamassuModalCertRevocation 
            open={open} 
            handleClose={handleClose} 
            handleRevocation={props["handleRevocation"]} 
            certId={props["certId"]}
            certCommonName={props["certCommonName"]}
            issuerCaName={props["issuerCaName"]}
          />
        )
      
      case "caCreate":
        return (
          <LamassuModalCaCreation 
            open={open} 
            handleClose={handleClose} 
            handleSubmit={props["handleSubmit"]} 
          />
        )
      
      case "certImport":
        return (
          <LamassuModalCertImport 
            open={open} 
            handleClose={handleClose} 
            handleSubmit={props["handleSubmit"]} 
          />
        )
    
      case "dmsCreate":
        return (
          <LamassuModalDmsCreation 
            open={open} 
            handleClose={handleClose} 
            handleSubmitViaCsr={props["handleSubmitViaCsr"]} 
            handleSubmitViaForm={props["handleSubmitViaForm"]}
          />
        )
    
      case "dmsApproveRequest":
        return (
          <LamassuModalDmsApproval 
            open={open} 
            handleClose={handleClose} 
            handleSubmit={props["handleSubmit"]} 
            dmsId={props["dmsId"]} 
            dmsName={props["dmsName"]} 
          />
        )
        
        case "dmsDeclineRequest":
          return (
            <LamassuModalDmsDecline 
            open={open} 
            handleClose={handleClose} 
            handleSubmit={props["handleSubmit"]} 
            dmsId={props["dmsId"]} 
            dmsName={props["dmsName"]} 
          />
        )

        case "dmsRevokeRequest":
          return (
            <LamassuModalDmsRevoke 
            open={open} 
            handleClose={handleClose} 
            handleSubmit={props["handleSubmit"]} 
            dmsId={props["dmsId"]} 
            dmsName={props["dmsName"]} 
          />
        )

        case "dmsPrivKeyResponse":
          return (
            <LamassuModalDmsCreationPrivKeyResponse 
            open={open} 
            handleClose={handleClose} 
            handleSubmit={props["handleSubmit"]} 
            dmsId={props["dmsId"]} 
            dmsName={props["dmsName"]} 
            privKey={props["privKey"]} 
          />
        )

        case "deviceCreate":
          return (
            <LamassuModalDeviceCreation
            open={open} 
            handleClose={handleClose} 
            handleSubmit={props["handleSubmit"]} 
          />
        )
    
      default:
        return(
          <></>
        )
        break;
    }
    
}

export {
  LamassuModalPolyphormic,
}