import { ofType } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { makeRequestWithActions } from "ducks/utils";
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"
import * as dmsApiCalls from "./ApiCalls";
import { from, of } from 'rxjs';

const getDmsEpic = action$ => action$.pipe(
    ofType(actions.GET_ALL_DMS_ENROLLER),
    mergeMap(() => makeRequestWithActions(dmsApiCalls.getAllDms(), actions.GET_ALL_DMS_ENROLLER)),
);

const createDmsViaCsrEpic = action$ => action$.pipe(
    ofType(actions.CREATE_DMS_ENROLLER_REQUEST_VIA_CSR_REQUEST),
    mergeMap(({payload}) => makeRequestWithActions(dmsApiCalls.createDmsViaCsr(payload), actions.CREATE_DMS_ENROLLER_REQUEST_VIA_CSR_REQUEST)),
);

const createDmsViaFormEpic = action$ => action$.pipe(
    ofType(actions.CREATE_DMS_ENROLLER_REQUEST_VIA_FORM_REQUEST),
    mergeMap(({payload}) => makeRequestWithActions(dmsApiCalls.createDmsViaForm(payload), actions.CREATE_DMS_ENROLLER_REQUEST_VIA_FORM_REQUEST)),
);

const notifyCreateDmsSuccess = action$ => action$.pipe(
    ofType(actions.CREATE_DMS_ENROLLER_REQUEST_VIA_CSR_REQUEST_SUCCESS, actions.CREATE_DMS_ENROLLER_REQUEST_VIA_FORM_REQUEST_SUCCESS),
    mapTo({ type: notificationActions.NOTIFY, payload: {msg: "Device manufacturing system request successfully created", type: "success"} })
);

const refreshDMSs = action$ => action$.pipe(
    ofType(actions.CREATE_DMS_ENROLLER_REQUEST_VIA_CSR_REQUEST_SUCCESS, actions.CREATE_DMS_ENROLLER_REQUEST_VIA_FORM_REQUEST_SUCCESS),
    mergeMap(() => makeRequestWithActions(dmsApiCalls.getAllDms(), actions.GET_ALL_DMS_ENROLLER)),
);

const updateDmsStatus = action$ => action$.pipe(
    ofType(actions.UPDATE_DMS_ENROLLER_STATUS),
    mergeMap(({payload}) => makeRequestWithActions(dmsApiCalls.updateDmsStatus(payload), actions.UPDATE_DMS_ENROLLER_STATUS)),
);


const getCertForApprovedDms = action$ => action$.pipe(
    ofType(actions.GET_ALL_DMS_ENROLLER_SUCCESS),
    mergeMap(response => {return response.payload.filter(dms=>dms.status == "APPROVED").map(dms => dms.id)}), 
    mergeMap(dmsId => makeRequestWithActions(dmsApiCalls.getDmsCert({id: dmsId}), actions.GET_DMS_ENROLLER_CERT, {dmsId: dmsId}))
);

/// General ERROR Notify
const notifyError = (action$, state$) => action$.pipe(
    ofType(actions.GET_ALL_DMS_ENROLLER_ERROR, actions.UPDATE_DMS_ENROLLER_STATUS_ERROR, actions.CREATE_DMS_ENROLLER_REQUEST_VIA_CSR_REQUEST_ERROR, actions.CREATE_DMS_ENROLLER_REQUEST_VIA_FORM_REQUEST_ERROR, actions.GET_DMS_ENROLLER_CERT_ERROR ),
    mergeMap(({ payload, meta })=> {
      return of({ type: notificationActions.NOTIFY, payload: {msg: payload, type: "error"} })
    })
  );
  

export {
    getDmsEpic,
    createDmsViaCsrEpic,
    createDmsViaFormEpic,
    updateDmsStatus,
    refreshDMSs,
    notifyCreateDmsSuccess,
    notifyError,
    getCertForApprovedDms
}