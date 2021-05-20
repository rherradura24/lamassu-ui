import { LamassuModalCertRevocation } from "./CertRevocation";
import { LamassuModalCaCreation } from "./CaCreation";
import { LamassuModalCertImport } from "./CertImport";
import { LamassuModalDmsCreation } from "./DmsCreation";

const LamassuModalPolyphormic = ({ type, open, handleClose, ...props }) =>{
    switch (type) {
      case "certRevoke":
        return (
          <LamassuModalCertRevocation 
            open={open} 
            handleClose={handleClose} 
            handleRevocation={props["handleRevocation"]} 
            certId={props["certId"]}
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