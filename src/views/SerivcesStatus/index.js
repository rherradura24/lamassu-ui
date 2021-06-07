import {ServicesStatus} from "./ServiceStatus"

import { connect } from "react-redux";
import { getServices } from "ducks/consulServices/Reducer";
import * as consulActions from "ducks/consulServices/Actions";
import { createLoader } from "components/utils";

const mapStateToProps = (state, {certId}) => ({ 
  services : getServices(state, certId)
})

const mapDispatchToProps = (dispatch) => ({
    onMount: ()=>{ dispatch(consulActions.getConsulServices()) },

})

export default connect(mapStateToProps, mapDispatchToProps) (createLoader(ServicesStatus));