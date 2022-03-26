import { Epic, ofType } from "redux-observable";
import { RootState } from "../../reducers";
import { actionTypes } from "./actions";
import { Action } from "redux-actions";
import { mergeMap } from "rxjs/operators";
import { makeRequestWithActions } from "ducks/services/api";

import * as apicalls from "./apicalls";

export const getCAsEpic: Epic<Action<any>, Action<any>, RootState, {}> = (action$, store) =>
    action$.pipe(
        ofType(actionTypes.GET_CAS),
        mergeMap(({ payload }) => makeRequestWithActions(apicalls.getCAs(), actionTypes.GET_CAS, { ...payload }))
    );

export const getIssuedCertsEpic: Epic<Action<any>, Action<any>, RootState, {}> = (action$, store) =>
    action$.pipe(
        ofType(actionTypes.GET_ISSUED_CERTS),
        mergeMap(({ payload }) => makeRequestWithActions(apicalls.getIssuedCerts(payload.caName), actionTypes.GET_ISSUED_CERTS, { ...payload }))
    );
