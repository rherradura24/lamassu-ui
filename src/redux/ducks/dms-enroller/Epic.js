import { ofType } from 'redux-observable';
import { failed, makeRequestWithActions, success } from 'redux/utils';
import { mergeMap, tap } from 'rxjs/operators';
import * as t from "./ActionTypes"
import * as lamassuDmsEnrollerApi from "./ApiCalls";
import  notificationsDuck from "redux/ducks/notifications";
import { of, from } from 'rxjs';

// GET_DMS_LIST
export const getDmsListEpic = action$ => action$.pipe(
    ofType(t.GET_DMS_LIST),
    mergeMap(() => makeRequestWithActions(lamassuDmsEnrollerApi.getDmsList(), t.GET_DMS_LIST)),
);

export const getCasEpicError= action$ => action$.pipe(
    ofType(failed(t.GET_DMS_LIST)),
    mergeMap(({payload}) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting DMSs: ${payload}`))),
);


// CREATE_DMS
export const createCaEpic = action$ => action$.pipe(
    ofType(t.CREATE_DMS),
    // tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({payload}) => {return makeRequestWithActions(lamassuDmsEnrollerApi.createDMS(payload.dmsName, payload.body), t.CREATE_DMS)})
);

export const createCaEpicError= action$ => action$.pipe(
    ofType(failed(t.CREATE_DMS)),
    mergeMap(({payload}) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while creating DMS: ${payload}`))),
);

export const createCaEpicSuccessNotification= action$ => action$.pipe(
    ofType(success(t.CREATE_DMS)),
    tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({payload}) => of(
        notificationsDuck.actions.addNotification(notificationsDuck.constants.SUCCESS, `${payload.name} DMS successfully created!`)),
    )
);

export const createCaEpicSuccessTriggerRefresh= action$ => action$.pipe(
    ofType(success(t.CREATE_DMS)),
    tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(()=> makeRequestWithActions(lamassuDmsEnrollerApi.getDmsList(), t.GET_DMS_LIST) )
);