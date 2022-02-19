import { connect } from "react-redux";
import * as casActions from "redux/ducks/certificate-authorities/Actions";
import { createLoader } from "components/utils";
import { getCAs } from 'redux/ducks/certificate-authorities/Reducer';
import { CaList } from './CaList';

const mapStateToProps = (state) => ({
  caList : getCAs(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ dispatch(casActions.getCAs()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CaList));