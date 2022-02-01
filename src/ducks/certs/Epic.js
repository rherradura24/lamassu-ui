import { ofType } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { makeRequestWithActions } from "ducks/utils";
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"
import * as certsApiCalls from "./ApiCalls";
import { of, from } from 'rxjs';

// CAs 

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

const notifyRevokeCASuccess = action$ => action$.pipe(
  ofType(actions.REVOKE_CA_SUCCESS),
  mapTo({ type: notificationActions.NOTIFY, payload: {msg: "CA successfully revoked", type: "success"} })
);

const importCA = action$ => action$.pipe(
  ofType(actions.IMPORT_CA),
  mergeMap( ({ payload }) => makeRequestWithActions(certsApiCalls.importCA(payload), actions.IMPORT_CA)),
);

const revokeCA = action$ => action$.pipe(
  ofType(actions.REVOKE_CA),
  mergeMap( ({ payload }) => makeRequestWithActions(certsApiCalls.revokeCA(payload), actions.REVOKE_CA)),
);

const bindAwsCAPolicy = action$ => action$.pipe(
  ofType(actions.BIND_AWS_CA_POLICY),
  mergeMap( ({ payload }) => makeRequestWithActions(certsApiCalls.bindAwsCAPolicy(payload), actions.BIND_AWS_CA_POLICY, {caName: payload.caName})),
);

const notifyBindAwsCAPolicy = action$ => action$.pipe(
  ofType(actions.BIND_AWS_CA_POLICY_SUCCESS),
  mergeMap(({ payload, meta }) => { console.log(payload, meta); return of ({ type: notificationActions.NOTIFY, payload: {msg: "AWS policy succesfully binded for "+ meta.caName + " CA", type: "success"}})})
);

// Certs

const getCertsEpic = action$ => action$.pipe(
  ofType(actions.GET_CERTS),
  mergeMap( ({payload}) => from(payload.caTypesToFetch)),
  mergeMap(caType => {console.log(caType); return makeRequestWithActions(certsApiCalls.getCAs(), actions.GET_CAS, {})}),
  mergeMap(response => {
    console.log(response);
    if(response.type == actions.GET_CAS_SUCCESS){
      return from(response.payload.map(caItem => caItem.name)).pipe(
        mergeMap(name => {console.log(name); return makeRequestWithActions(certsApiCalls.getCerts("pki", name), actions.GET_CERTS, {})})
      )
    }else{
      return from([])
    }
  }),
);
  
const revokeCert = action$ => action$.pipe(
  ofType(actions.REVOKE_CERT),
  mergeMap( ({ payload }) => makeRequestWithActions(certsApiCalls.revokeCert(payload), actions.REVOKE_CERT)),
);

const notifyRevokeCertSuccess = action$ => action$.pipe(
  ofType(actions.REVOKE_CERT_SUCCESS),
  mapTo({ type: notificationActions.NOTIFY, payload: {msg: "Certificate successfully revoked", type: "success"} })
);
  
// Refreshers 
const refreshCAs = action$ => action$.pipe(
  ofType(actions.REVOKE_CA_SUCCESS, actions.IMPORT_CA_SUCCESS, actions.CREATE_CA_SUCCESS),
  mergeMap(() => makeRequestWithActions(certsApiCalls.getCAs(), actions.GET_CAS)),
);

const refreshCerts = action$ => action$.pipe(
  ofType(actions.REVOKE_CERT_SUCCESS),
  mergeMap(() => makeRequestWithActions(certsApiCalls.getCerts(), actions.GET_CERTS)),
);

/// General ERROR Notify
const notifyError = (action$, state$) => action$.pipe(
  ofType(actions.IMPORT_CA_ERROR, actions.GET_CA_ERROR, actions.GET_CAS_ERROR, actions.CREATE_CA_ERROR ),
  mergeMap(({ payload, meta })=> {
    return of({ type: notificationActions.NOTIFY, payload: {msg: payload, type: "error"} })
  })
);

export {
  getCasEpic,
  getCaEpic,
  importCA,
  createCA,
  revokeCA,
  refreshCAs,
  bindAwsCAPolicy,
  notifyBindAwsCAPolicy,
  notifyCreateCASuccess,
  notifyImportCASuccess,
  notifyRevokeCASuccess,
  notifyError,

  refreshCerts,
  getCertsEpic,
  revokeCert,
  notifyRevokeCertSuccess,
}
