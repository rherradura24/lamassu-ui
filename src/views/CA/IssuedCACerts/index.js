import IssuedCACerts from "./IssuedCACerts"
import * as certsActions from "ducks/certs/Actions";
import { getAllCerts } from "ducks/certs/Reducer";
import { createLoader } from "components/utils";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    certsData : getAllCerts(state)
})
  
const mapDispatchToProps = (dispatch) => ({
    onMount: ()=>{ dispatch(certsActions.getCerts()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(IssuedCACerts));
