import { LamassuModalCaCreation } from "./CaCreation"


export const ModalType = {
    CA_CREATION: "CA_CREATION",
}

export const LamassuMultiModal = ({ type, open, handleClose, ...props }) =>{
    switch (type) {
        case ModalType.CA_CREATION:
            return (
              <LamassuModalCaCreation 
                open={open} 
                handleClose={handleClose} 
                handleSubmit={props["handleSubmit"]} 
              />
            )
        }
}