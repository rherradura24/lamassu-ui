import { ofType } from 'redux-observable';
import { failed, makeRequestWithActions, success } from 'redux/utils';
import { mergeMap, tap } from 'rxjs/operators';
import * as t from "./ActionTypes"
import * as lamassuCaApi from "./ApiCalls";
import  notificationsDuck from "redux/ducks/notifications";
import { of, from } from 'rxjs';

// GET_CAS

export const getCasEpic = action$ => action$.pipe(
    ofType(t.GET_CAS),
    mergeMap(() => makeRequestWithActions(lamassuCaApi.getCAs(), t.GET_CAS)),
);

export const getCasEpicError= action$ => action$.pipe(
    ofType(failed(t.GET_CAS)),
    mergeMap(({payload}) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting Certificate Authorities: ${payload}`))),
);


// GET_ISSUED_CERTS

export const getIssuedCertsEpic = action$ => action$.pipe(
    ofType(t.GET_ISSUED_CERTS),
    tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap( ({payload}) => makeRequestWithActions(lamassuCaApi.getIssuedCerts(payload.caName), t.GET_ISSUED_CERTS, {caName: payload.caName})),
);

export const getIssuedCertsEpicError= action$ => action$.pipe(
    ofType(failed(t.GET_ISSUED_CERTS)),
    mergeMap(({payload}) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting Issued certificates: ${payload}`))),
);

// CREATE_CA

export const createCaEpic = action$ => action$.pipe(
    ofType(t.CREATE_CA),
    // tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({payload}) => {return makeRequestWithActions(lamassuCaApi.createCA(payload.caName, payload.body), t.CREATE_CA)})
);

export const createCaEpicError= action$ => action$.pipe(
    ofType(failed(t.CREATE_CA)),
    mergeMap(({payload}) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while creating Certificate Authority: ${payload}`))),
);

export const createCaEpicSuccessNotification= action$ => action$.pipe(
    ofType(success(t.CREATE_CA)),
    tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({payload}) => of(
        notificationsDuck.actions.addNotification(notificationsDuck.constants.SUCCESS, `${payload.name} CA successfully created!`)),
    )
);

export const createCaEpicSuccessTriggerRefresh= action$ => action$.pipe(
    ofType(success(t.CREATE_CA)),
    tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(()=> makeRequestWithActions(lamassuCaApi.getCAs(), t.GET_CAS) )
);