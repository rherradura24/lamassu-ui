import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';

import { combineEpics } from 'redux-observable';
import { combineReducers, compose } from 'redux';
import ca from './certificate-authorities';
import devManager from './device-manager';
import dmsEnroller from './dms-enroller';
import notifications from './notifications';

const epics = [
    ...Object.values(ca.epic),
    ...Object.values(devManager.epic),
    ...Object.values(dmsEnroller.epic),
]

const rootEpic = combineEpics(...epics);

const rootReducer = combineReducers({
    cas: ca.reducer.reducer,
    devices: devManager.reducer.reducer,
    dmsenroller: dmsEnroller.reducer.reducer,
    notifications: notifications.reducer.reducer,
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
  