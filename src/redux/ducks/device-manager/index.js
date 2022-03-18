import * as devManagerReducer from "./Reducer"
import * as devManagerEpic from "./Epic"
import * as devManagerActions from "./Actions"

export default {
  reducer: devManagerReducer,
  epic: devManagerEpic,
  actions: devManagerActions
}
