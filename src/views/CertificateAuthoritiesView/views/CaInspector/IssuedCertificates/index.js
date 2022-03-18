import { connect } from "react-redux"
import casDuck from "redux/ducks/certificate-authorities"
import { createLoader } from "components/utils"
import { IssuedCertificates } from "./IssuedCertificates"
import { actionType, status } from "redux/utils/constants"

const mapStateToProps = (state, { caName }) => {
  const reqInProgress = casDuck.reducer.isIssuedCertsRequestInProgress(state, caName)
  return {
    refreshing: reqInProgress.status === status.PENDING && reqInProgress.actionType === actionType.READ,
    certificates: casDuck.reducer.getIssuedCerts(state, caName)
  }
}

const mapDispatchToProps = (dispatch, { caName }) => ({
  onMount: () => {
    dispatch(casDuck.actions.getIssuedCerts(caName))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(IssuedCertificates))
