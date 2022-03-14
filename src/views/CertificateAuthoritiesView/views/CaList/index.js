import { connect } from "react-redux";
import casDuck from "redux/ducks/certificate-authorities";
import { createLoader } from "components/utils";
import { CaList } from './CaList';
import { actionType, status } from "redux/utils/constants";


const mapStateToProps = (state, {caName}) => {
  const reqInProgress = casDuck.reducer.isRequestInProgress(state, caName); 
  return{
      refreshing : reqInProgress.status == status.PENDING && reqInProgress.actionType == actionType.READ,
      caList : casDuck.reducer.getCAs(state),
  }
}


const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ console.log("! Firing GET CAS");dispatch(casDuck.actions.getCAs()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CaList));