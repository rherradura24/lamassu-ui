import * as notificationsReducer from "./Reducer"
import * as notificationsActions from "./Actions"
import { notificationType } from "./Constants"

export default {
  reducer: notificationsReducer,
  actions: notificationsActions,
  constants: notificationType
}
