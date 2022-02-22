import { connect } from "react-redux";
import casDuck from "redux/ducks/certificate-authorities";
import { createLoader } from "components/utils";
import { CaList } from './CaList';

const mapStateToProps = (state) => ({
  caList : casDuck.reducer.getCAs(state),
  refreshing: casDuck.reducer.isRequestInProgress(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ dispatch(casDuck.actions.getCAs()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CaList));