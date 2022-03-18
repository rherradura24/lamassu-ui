import { ofType } from "redux-observable"
import { failed, makeRequestWithActions, success } from "redux/utils"
import { mergeMap, tap } from "rxjs/operators"
import * as t from "./ActionTypes"
import * as lamassuCaApi from "./ApiCalls"
import notificationsDuck from "redux/ducks/notifications"
import cloudProxyDuck from "redux/ducks/cloud-proxy"
import { of, from, forkJoin, defaultIfEmpty, switchMap, debounceTime } from "rxjs"

// GET_CAS

export const getCasEpic = action$ => {
  console.log(action$.source.subscribe(a => console.log("%c Epic ", "background:#ee8410; border-radius:5px;font-weight: bold;", "", a)))
  return action$.pipe(
    ofType(t.GET_CAS),
    // tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
    switchMap(() => makeRequestWithActions(lamassuCaApi.getCAs(), t.GET_CAS))
  )
}

export const getCasEpicError = action$ => action$.pipe(
  ofType(failed(t.GET_CAS)),
  switchMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting Certificate Authorities: ${payload}`)))
)

// GET_ISSUED_CERTS

export const getIssuedCertsEpic = action$ => action$.pipe(
  ofType(t.GET_ISSUED_CERTS),
  // tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
  switchMap(({ payload }) => makeRequestWithActions(lamassuCaApi.getIssuedCerts(payload.caName), t.GET_ISSUED_CERTS, { caName: payload.caName }))
)

export const getIssuedCertsEpicError = action$ => action$.pipe(
  ofType(failed(t.GET_ISSUED_CERTS)),
  switchMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting Issued certificates: ${payload}`)))
)

// CREATE_CA

export const createCaEpic = action$ => action$.pipe(
  ofType(t.CREATE_CA),
  // tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
  mergeMap(({ payload }) => forkJoin(
    payload.selectedConnectors.map(connectorId =>
      makeRequestWithActions(cloudProxyDuck.apiCalls.synchronizeCloudConnectors({
        connector_id: connectorId,
        ca_name: payload.caName
      }), cloudProxyDuck.actionTypes.SYNCHRONIZE_CONNECTOR, payload)
    )
  ).pipe(defaultIfEmpty([{ meta: { ...payload } }]))
  ),
  // tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
  mergeMap((array) => { return makeRequestWithActions(lamassuCaApi.createCA(array[0].meta.caName, array[0].meta.body), t.CREATE_CA) })
)

export const createCaEpicError = action$ => action$.pipe(
  ofType(failed(t.CREATE_CA)),
  switchMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while creating Certificate Authority: ${payload}`)))
)

export const createCaEpicSuccessNotification = action$ => action$.pipe(
  ofType(success(t.CREATE_CA)),
  // tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
  switchMap(({ payload }) => of(
    notificationsDuck.actions.addNotification(notificationsDuck.constants.SUCCESS, `${payload.name} CA successfully created!`))
  )
)

// export const createCaEpicSuccessTriggerRefresh= action$ => action$.pipe(
//     ofType(success(t.CREATE_CA)),
//     // tap(item => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
//     switchMap(()=> makeRequestWithActions(lamassuCaApi.getCAs(), t.GET_CAS) )
// );
