import { ofType } from 'redux-observable';
import { failed, makeRequestWithActions, success } from 'redux/utils';
import { mergeMap } from 'rxjs/operators';
import * as t from "./ActionTypes"
import * as lamassuCaApi from "./ApiCalls";
import  notificationsDuck from "redux/ducks/notifications";
import { of, from } from 'rxjs';

export const getCasEpic = action$ => action$.pipe(
    ofType(t.GET_CAS),
    mergeMap(() => makeRequestWithActions(lamassuCaApi.getCAs(), t.GET_CAS)),
);

export const getIssuedCertsEpic = action$ => action$.pipe(
    ofType(t.GET_ISSUED_CERTS),
    mergeMap( ({payload}) => makeRequestWithActions(lamassuCaApi.getIssuedCerts(payload.caName), t.GET_ISSUED_CERTS, {caName: payload.caName})),
);

export const getCasEpicError= action$ => action$.pipe(
    ofType(failed(t.GET_CAS)),
    mergeMap(({payload}) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting Certificate Authorities from Lamassu CA API: ${payload}`))),
);