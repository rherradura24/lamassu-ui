import IssuedCACerts from "./IssuedCACerts"
import * as certsActions from "ducks/certs/Actions";
import { getIssuedCertByCA, getLoadingData } from "ducks/certs/Reducer";
import { createLoader } from "components/utils";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    certsData : getIssuedCertByCA(state),
    loadingData: getLoadingData(state)
})
  
const mapDispatchToProps = (dispatch) => ({
    onMount: ()=>{ dispatch(certsActions.getCerts("", "ops")) },
    revokeCert: (serialNumber, caName) => {dispatch(certsActions.revokeCert(serialNumber, caName))},
    reloadCerts: (newCaType)=>{ dispatch(certsActions.getCerts("", newCaType))} 
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(IssuedCACerts));
