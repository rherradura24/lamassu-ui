import { connect } from "react-redux"
import { createLoader } from "components/utils"
import dmsEnrollerDuck from "redux/ducks/dms-enroller"
import { DmsList } from "./DmsList"

const mapStateToProps = (state) => ({
  dmsList: dmsEnrollerDuck.reducer.getDmsList(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: () => { dispatch(dmsEnrollerDuck.actions.getDmsList()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(DmsList))
