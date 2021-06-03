import IssuedCACerts from "./IssuedCACerts"
import * as certsActions from "ducks/certs/Actions";
import { getIssuedCertByCA } from "ducks/certs/Reducer";
import { createLoader } from "components/utils";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    certsData : getIssuedCertByCA(state)
})
  
const mapDispatchToProps = (dispatch) => ({
    onMount: ()=>{ dispatch(certsActions.getCerts()) },
    revokeCert: (serialNumber, caName) => {dispatch(certsActions.revokeCert(serialNumber, caName))}
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(IssuedCACerts));
