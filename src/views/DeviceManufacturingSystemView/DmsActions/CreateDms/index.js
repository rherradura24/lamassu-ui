import { connect } from "react-redux";
import { createLoader } from "components/utils";
import dmsEnrollerDuck from "redux/ducks/dms-enroller";
import { CreateDms } from "./CreateDms";

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ 
    //   dispatch(dmsEnrollerDuck.actions.getDmsList()) 
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CreateDms));