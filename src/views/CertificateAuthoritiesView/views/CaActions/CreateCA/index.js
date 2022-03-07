import { connect } from "react-redux";
import casDuck from "redux/ducks/certificate-authorities";
import { actionType, status } from "redux/utils/constants";
import { CreateCA } from "./CreateCA";

const mapStateToProps = (state, {caName}) => {
    const reqInProgress = casDuck.reducer.isRequestInProgress(state, caName); 
    return{
        requestInProgress : reqInProgress.status == status.PENDING && reqInProgress.actionType == actionType.CREATE,
    }
}

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (caName, country, state, locality, organization, organizationUnit, commonName, caTtl, enrollerTtl, keyType, keyBits)=>{
        dispatch(casDuck.actions.createCA(caName, country, state, locality, organization, organizationUnit, commonName, caTtl, enrollerTtl, keyType, keyBits)) 
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCA);