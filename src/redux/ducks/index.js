import { createEpicMiddleware, combineEpics } from "redux-observable"
import { createStore, applyMiddleware, combineReducers, compose } from "redux"

import ca from "./certificate-authorities"
import devManager from "./device-manager"
import dmsEnroller from "./dms-enroller"
import cloudProxy from "./cloud-proxy"
import notifications from "./notifications"

const epics = [
  ...Object.values(ca.epic),
  ...Object.values(devManager.epic),
  ...Object.values(dmsEnroller.epic),
  ...Object.values(cloudProxy.epic)
]

const rootEpic = combineEpics(...epics)

const rootReducer = combineReducers({
  cas: ca.reducer.reducer,
  devices: devManager.reducer.reducer,
  dmsenroller: dmsEnroller.reducer.reducer,
  cloudproxy: cloudProxy.reducer.reducer,
  notifications: notifications.reducer.reducer
})

const epicMiddleware = createEpicMiddleware()

export default function configureStore () {
  // const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 });
  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({

  //   trace: true,
  //   traceLimit: 25,
  //  }) || compose;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // DEBUG TOOL - REACT_REDUX CHROME EXTENSION
  // const composeEnhancers = compose; //DEBUG TOOL - REACT_REDUX CHROME EXTENSION

  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(epicMiddleware)
    )
  )

  epicMiddleware.run(rootEpic)

  return store
}
