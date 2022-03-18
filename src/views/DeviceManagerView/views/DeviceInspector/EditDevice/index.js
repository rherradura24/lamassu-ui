import { connect } from "react-redux"
import { createLoader } from "components/utils"
import devManagerDuck from "redux/ducks/device-manager"
import { EditDevice } from "./EditDevice"

const mapStateToProps = (state, { deviceId }) => ({
  deviceData: devManagerDuck.reducer.getDeviceById(state, deviceId),
  refreshing: devManagerDuck.reducer.isRequestInProgress(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(devManagerDuck.actions.getDevices())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(EditDevice))
