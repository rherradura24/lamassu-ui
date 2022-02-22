import { connect } from "react-redux";
import casDuck from "redux/ducks/certificate-authorities";
import { createLoader } from "components/utils";
import { IssuedCertificates } from "./IssuedCertificates";

const mapStateToProps = (state, {caName}) => ({
    refreshing : casDuck.reducer.isIssuedCertsRequestInProgress(state, caName),
    certificates : casDuck.reducer.getIssuedCerts(state, caName)
})

const mapDispatchToProps = (dispatch, {caName}) => ({
    onMount: ()=>{ dispatch(casDuck.actions.getIssuedCerts(caName)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(IssuedCertificates));