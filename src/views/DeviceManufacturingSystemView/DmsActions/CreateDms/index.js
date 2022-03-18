import { connect } from "react-redux";
import { createLoader } from "components/utils";
import dmsEnrollerDuck from "redux/ducks/dms-enroller";
import { CreateDms } from "./CreateDms";

const mapStateToProps = (state) => ({
    requestStatus: dmsEnrollerDuck.reducer.isRequestInProgress(state),
    privateKey: dmsEnrollerDuck.reducer.lastPrivateKey(state)
})

const mapDispatchToProps = (dispatch) => ({
    onMount: () => {
        //   dispatch(dmsEnrollerDuck.actions.getDmsList()) 
    },
    createDMS: (dmsName, country, state, locality, organization, organizationUnit, commonName, keyType, keyBits) => {
        dispatch(dmsEnrollerDuck.actions.createDMS(dmsName, country, state, locality, organization, organizationUnit, commonName, keyType, keyBits))
    },
    resetCurretRequestStatus: ()=> dispatch(dmsEnrollerDuck.actions.resetCurretRequestStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CreateDms));