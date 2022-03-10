import { createLoader } from "components/utils";
import { connect } from "react-redux";
import cloudProxyDuck from "redux/ducks/cloud-proxy";
import casDuck from "redux/ducks/certificate-authorities";
import { actionType, status } from "redux/utils/constants";
import { CreateCA } from "./CreateCA";

const mapStateToProps = (state, {caName}) => {
    const reqInProgress = casDuck.reducer.isRequestInProgress(state, caName); 
    return {
        requestStatus : reqInProgress,
        cloudConnectors: cloudProxyDuck.reducer.getCloudConnectors(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    onMount: ()=>{ 
        dispatch(cloudProxyDuck.actions.getCloudConnectors()) 
    },

    onSubmit: (selectedConnectors, caName, country, state, locality, organization, organizationUnit, commonName, caTtl, enrollerTtl, keyType, keyBits) => {
        dispatch(casDuck.actions.createCA(selectedConnectors, caName, country, state, locality, organization, organizationUnit, commonName, caTtl, enrollerTtl, keyType, keyBits)) 
    },

    resetCurretRequestStatus: ()=> dispatch(casDuck.actions.resetCurretRequestStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CreateCA));