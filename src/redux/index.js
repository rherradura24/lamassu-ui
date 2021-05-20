import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';

import { combineEpics } from 'redux-observable';
import { combineReducers, compose } from 'redux';

import { certsReducer, certsEpic } from 'ducks/certs';
import { dmsReducer, dmsEpic } from 'ducks/dms';
import { notificationsReducer } from "ducks/notifications"

const epics = [
  ...Object.values(certsEpic),
  ...Object.values(dmsEpic),
];

const rootEpic = combineEpics(...epics);

const rootReducer = combineReducers({
  certs: certsReducer,
  dms: dmsReducer,
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
  