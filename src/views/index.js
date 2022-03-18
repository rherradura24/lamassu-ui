import { connect } from "react-redux"
import notificationsDuck from "redux/ducks/notifications"
import { createLoader } from "components/utils"
import DashboardLayout from "./DashboardLayout"

const mapStateToProps = (state) => ({
  notificationsList: notificationsDuck.reducer.getNotificationList(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: () => { }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(DashboardLayout))
