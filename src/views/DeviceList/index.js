import { connect } from "react-redux";
import { createLoader } from "components/utils";
import { DeviceList } from "./DevicesList";
import devManagerDuck from "redux/ducks/device-manager";

const mapStateToProps = (state) => ({
  devices : devManagerDuck.reducer.getDevices(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ dispatch(devManagerDuck.actions.getDevices()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(DeviceList));