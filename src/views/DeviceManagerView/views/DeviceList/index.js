import { connect } from "react-redux"
import { createLoader } from "components/utils"
import { DeviceList } from "./DevicesList"
import devManagerDuck from "redux/ducks/device-manager"
import dmsEnrollerDuck from "redux/ducks/dms-enroller"

const mapStateToProps = (state) => ({
  devices: devManagerDuck.reducer.getDevices(state),
  deviceRequestInProgress: devManagerDuck.reducer.isRequestInProgress(state),
  dmsList: dmsEnrollerDuck.reducer.getDmsList(state),
  dmsEnrollerRequestInProgress: dmsEnrollerDuck.reducer.isRequestInProgress(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(devManagerDuck.actions.getDevices())
    dispatch(dmsEnrollerDuck.actions.getDmsList())
  },
  refreshData: () => { dispatch(devManagerDuck.actions.getDevices()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(DeviceList))
