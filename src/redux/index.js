import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';

import { combineEpics } from 'redux-observable';
import { combineReducers, compose } from 'redux';

import { certsReducer, certsEpic } from 'ducks/certs';
import { dmsEnrollerReducer, dmsEnrollerEpic } from 'ducks/dms-enroller';
import { devicesReducer, devicesEpic } from 'ducks/devices';
import { consulReducer, consulEpic } from 'ducks/consulServices';
import { notificationsReducer } from "ducks/notifications"

const epics = [
  ...Object.values(certsEpic),
  ...Object.values(dmsEnrollerEpic),
  ...Object.values(consulEpic),
  ...Object.values(devicesEpic),
];

const rootEpic = combineEpics(...epics);

const rootReducer = combineReducers({
  certs: certsReducer,
  dmsEnroller: dmsEnrollerReducer,
  consul: consulReducer,
  devices: devicesReducer,
  notifications: notificationsReducer
});

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //DEBUG TOOL - REACT_REDUX CHROME EXTENSION

    const store = createStore(
      rootReducer,
      composeEnhancers(
        applyMiddleware(epicMiddleware)
      )
    );
  
    epicMiddleware.run(rootEpic);
  
    return store;
}
  