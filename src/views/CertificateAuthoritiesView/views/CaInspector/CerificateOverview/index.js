import { connect } from "react-redux"
import casDuck from "redux/ducks/certificate-authorities"
import { createLoader } from "components/utils"
import { Overview } from "./CertificateOverview"

const mapStateToProps = (state, { caName }) => ({
  caData: casDuck.reducer.getCA(state, caName)
})

const mapDispatchToProps = (dispatch, { caName }) => ({
  onMount: () => {
    // dispatch(casDuck.actions.getIssuedCerts(caName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(Overview))
