import { ofType } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { makeRequestWithActions } from "ducks/utils";
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"
import * as dmsApiCalls from "./ApiCalls";
import { of } from 'rxjs';

const getDmsEpic = action$ => action$.pipe(
    ofType(actions.GET_ALL_DMS),
    mergeMap(() => makeRequestWithActions(dmsApiCalls.getAllDms(), actions.GET_ALL_DMS)),
);

const createDmsEpic = action$ => action$.pipe(
    ofType(actions.CREATE_DMS_REQUEST),
    mergeMap(({payload}) => makeRequestWithActions(dmsApiCalls.createDms(payload), actions.CREATE_DMS_REQUEST)),
);

const notifyCreateDmsSuccess = action$ => action$.pipe(
    ofType(actions.CREATE_DMS_REQUEST_SUCCESS),
    mapTo({ type: notificationActions.NOTIFY, payload: {msg: "Device manufacturing system request successfully created", type: "success"} })
);

const refreshDMSs = action$ => action$.pipe(
    ofType(actions.CREATE_DMS_REQUEST_SUCCESS),
    mergeMap(() => makeRequestWithActions(dmsApiCalls.getAllDms(), actions.GET_ALL_DMS)),
);

const updateDmsStatus = action$ => action$.pipe(
    ofType(actions.UPDATE_DMS_STATUS),
    mergeMap(({payload}) => makeRequestWithActions(dmsApiCalls.updateDmsStatus(payload), actions.UPDATE_DMS_STATUS)),
);


/// General ERROR Notify
const notifyError = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_DMS_ERROR, actions.UPDATE_DMS_STATUS_ERROR, actions.CREATE_DMS_REQUEST_ERROR ),
    mergeMap(({ payload, meta })=> {
      return of({ type: notificationActions.NOTIFY, payload: {msg: payload, type: "error"} })
    })
  );
  

export {
    getDmsEpic,
    createDmsEpic,
    updateDmsStatus,
    refreshDMSs,
    notifyCreateDmsSuccess,
    notifyError
}