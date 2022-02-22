import { ofType } from 'redux-observable';
import { makeRequestWithActions } from 'redux/utils';
import { mergeMap } from 'rxjs/operators';
import * as t from "./ActionTypes"
import * as lamassuCaApi from "./ApiCalls";

export const getCasEpic = action$ => action$.pipe(
    ofType(t.GET_CAS),
    mergeMap(() => makeRequestWithActions(lamassuCaApi.getCAs(), t.GET_CAS)),
);

export const getIssuedCertsEpic = action$ => action$.pipe(
    ofType(t.GET_ISSUED_CERTS),
    mergeMap( ({payload}) => makeRequestWithActions(lamassuCaApi.getIssuedCerts(payload.caName), t.GET_ISSUED_CERTS, {caName: payload.caName})),
);