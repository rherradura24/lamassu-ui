import { ofType } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { makeRequestWithActions } from "ducks/utils";
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"
import * as certsApiCalls from "./ApiCalls";
import { of } from 'rxjs';

const getCasEpic = action$ => action$.pipe(
  ofType(actions.GET_CAS),
  mergeMap(() => makeRequestWithActions(certsApiCalls.getCAs(), actions.GET_CAS)),
);

const getCaEpic = action$ => action$.pipe(
  ofType(actions.GET_CA),
  mergeMap( ({ payload }) => makeRequestWithActions(certsApiCalls.getCA(payload.caId), actions.GET_CA)),
);

const createCA = action$ => action$.pipe(
  ofType(actions.CREATE_CA),
  mergeMap( ({ payload }) => makeRequestWithActions(certsApiCalls.createCA(payload), actions.CREATE_CA)),
);

const notifyCreateCASuccess = action$ => action$.pipe(
  ofType(actions.CREATE_CA_SUCCESS),
  mapTo({ type: notificationActions.NOTIFY, payload: {msg: "CA successfully created", type: "success"} })
);

const notifyImportCASuccess = action$ => action$.pipe(
  ofType(actions.IMPORT_CA_SUCCESS),
  mapTo({ type: notificationActions.NOTIFY, payload: {msg: "CA successfully imported", type: "success"} })
);

const importCA = action$ => action$.pipe(
  ofType(actions.IMPORT_CA),
  mergeMap( ({ payload }) => makeRequestWithActions(certsApiCalls.importCA(payload), actions.IMPORT_CA)),
);

const revokeCA = action$ => action$.pipe(
  ofType(actions.REVOKE_CERT),
  mergeMap( ({ payload }) => makeRequestWithActions(certsApiCalls.revokeCA(payload), actions.REVOKE_CERT)),
);

const refreshCAs = action$ => action$.pipe(
  ofType(actions.REVOKE_CERT_SUCCESS, actions.IMPORT_CA_SUCCESS, actions.CREATE_CA_SUCCESS),
  mergeMap(() => makeRequestWithActions(certsApiCalls.getCAs(), actions.GET_CAS)),
);

const getCertsEpic = action$ => action$.pipe(
  ofType(actions.GET_CERTS),
  mergeMap( () => makeRequestWithActions(certsApiCalls.getCerts(), actions.GET_CERTS)),
);

const notifyError = (action$, state$) => action$.pipe(
  ofType(actions.IMPORT_CA_ERROR, actions.GET_CA_ERROR, actions.GET_CAS_ERROR, actions.CREATE_CA_ERROR ),
  mergeMap(({ payload, meta })=> {
    return of({ type: notificationActions.NOTIFY, payload: {msg: payload, type: "error"} })
  })
);

export {
  getCertsEpic,
  getCasEpic,
  getCaEpic,
  importCA,
  createCA,
  revokeCA,
  refreshCAs,
  notifyCreateCASuccess,
  notifyImportCASuccess,
  notifyError,
}
