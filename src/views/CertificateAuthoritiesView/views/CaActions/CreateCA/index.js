import { connect } from "react-redux";
import casDuck from "redux/ducks/certificate-authorities";
import { actionType, status } from "redux/utils/constants";
import { CreateCA } from "./CreateCA";

const mapStateToProps = (state, {caName}) => {
    const reqInProgress = casDuck.reducer.isRequestInProgress(state, caName); 
    return {
        requestStatus : reqInProgress
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (caName, country, state, locality, organization, organizationUnit, commonName, caTtl, enrollerTtl, keyType, keyBits) => {
        dispatch(casDuck.actions.createCA(caName, country, state, locality, organization, organizationUnit, commonName, caTtl, enrollerTtl, keyType, keyBits)) 
    },
    resetCurretRequestStatus: ()=> dispatch(casDuck.actions.resetCurretRequestStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCA);