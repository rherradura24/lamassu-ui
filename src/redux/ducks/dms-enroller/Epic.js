import { ofType } from 'redux-observable';
import { failed, makeRequestWithActions, success } from 'redux/utils';
import { mergeMap, tap, switchMap } from 'rxjs/operators';
import * as t from "./ActionTypes"
import * as lamassuDmsEnrollerApi from "./ApiCalls";
import notificationsDuck from "redux/ducks/notifications";
import { of, from } from 'rxjs';

// GET_DMS_LIST
export const getDmsListEpic = action$ => action$.pipe(
    ofType(t.GET_DMS_LIST),
    switchMap(() => makeRequestWithActions(lamassuDmsEnrollerApi.getDmsList(), t.GET_DMS_LIST)),
);

export const getDmsEpicError = action$ => action$.pipe(
    ofType(failed(t.GET_DMS_LIST)),
    switchMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting DMSs: ${payload}`))),
);


// CREATE_DMS
export const createDmsEpic = action$ => action$.pipe(
    ofType(t.CREATE_DMS),
    // tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload }) => { return makeRequestWithActions(lamassuDmsEnrollerApi.createDMS(payload.dmsName, payload.body), t.CREATE_DMS) })
);

export const createDmsEpicError = action$ => action$.pipe(
    ofType(failed(t.CREATE_DMS)),
    switchMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while creating DMS: ${payload}`))),
);

export const createDmsEpicSuccessNotification = action$ => action$.pipe(
    ofType(success(t.CREATE_DMS)),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    switchMap(({ payload }) => of(
        notificationsDuck.actions.addNotification(notificationsDuck.constants.SUCCESS, `${payload.name} DMS successfully created!`)),
    )
);

export const createDmsEpicSuccessTriggerRefresh = action$ => action$.pipe(
    ofType(success(t.CREATE_DMS)),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(() => makeRequestWithActions(lamassuDmsEnrollerApi.getDmsList(), t.GET_DMS_LIST))
);

// APPROVE_DMS_REQUEST

export const approveDmsEpic = action$ => action$.pipe(
    ofType(t.APPROVE_DMS_REQUEST),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload }) => makeRequestWithActions(lamassuDmsEnrollerApi.updateDMS(payload.dmsId, payload.body), t.APPROVE_DMS_REQUEST, {dmsId: payload.dmsId}))
);


export const approveDmsEpicError = action$ => action$.pipe(
    ofType(failed(t.APPROVE_DMS_REQUEST)),
    mergeMap(({ payload, meta }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while approving DMS: ${meta.dmsId}`))),
);

export const approveDmsEpicSuccessNotification = action$ => action$.pipe(
    ofType(success(t.APPROVE_DMS_REQUEST)),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload, meta }) => of(
        notificationsDuck.actions.addNotification(notificationsDuck.constants.SUCCESS, `${meta.dmsId} DMS successfully approved!`)),
    )
);

export const approveDmsEpicSuccessTriggerRefresh = action$ => action$.pipe(
    ofType(success(t.APPROVE_DMS_REQUEST)),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(() => makeRequestWithActions(lamassuDmsEnrollerApi.getDmsList(), t.GET_DMS_LIST))
);


// DECLINE_DMS_REQUEST

export const declineDmsEpic = action$ => action$.pipe(
    ofType(t.DECLINE_DMS_REQUEST),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload }) => makeRequestWithActions(lamassuDmsEnrollerApi.updateDMS(payload.dmsId, payload.body), t.DECLINE_DMS_REQUEST, {dmsId: payload.dmsId}))
);


export const declineDmsEpicError = action$ => action$.pipe(
    ofType(failed(t.DECLINE_DMS_REQUEST)),
    mergeMap(({ payload, meta }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while declining DMS request: ${meta.dmsId}`))),
);

export const declineDmsEpicSuccessNotification = action$ => action$.pipe(
    ofType(success(t.DECLINE_DMS_REQUEST)),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload, meta }) => of(
        notificationsDuck.actions.addNotification(notificationsDuck.constants.SUCCESS, `${meta.dmsId} DMS successfully declined`)),
    )
);

export const declineDmsEpicSuccessTriggerRefresh = action$ => action$.pipe(
    ofType(success(t.DECLINE_DMS_REQUEST)),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(() => makeRequestWithActions(lamassuDmsEnrollerApi.getDmsList(), t.GET_DMS_LIST))
);


// REVOKE_DMS

export const revokeDmsEpic = action$ => action$.pipe(
    ofType(t.REVOKE_DMS),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload }) => makeRequestWithActions(lamassuDmsEnrollerApi.updateDMS(payload.dmsId, payload.body), t.REVOKE_DMS, {dmsId: payload.dmsId}))
);


export const revokeDmsEpicError = action$ => action$.pipe(
    ofType(failed(t.REVOKE_DMS)),
    mergeMap(({ payload, meta }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while revoking DMS: ${meta.dmsId}`))),
);

export const revokeDmsEpicSuccessNotification = action$ => action$.pipe(
    ofType(success(t.REVOKE_DMS)),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload, meta }) => of(
        notificationsDuck.actions.addNotification(notificationsDuck.constants.SUCCESS, `${meta.dmsId} DMS successfully revoked!`)),
    )
);

export const revokeDmsEpicSuccessTriggerRefresh = action$ => action$.pipe(
    ofType(success(t.REVOKE_DMS)),
    tap(item => console.log("%c Epic ", "background:#851074; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(() => makeRequestWithActions(lamassuDmsEnrollerApi.getDmsList(), t.GET_DMS_LIST))
);