import { ofType } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { makeRequestWithActions } from "ducks/utils";
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"
import * as certsApiCalls from "./ApiCalls";

const getCasEpic = action$ => action$.pipe(
  ofType(actions.GET_CAS),
  mergeMap(() => makeRequestWithActions(certsApiCalls.getCAs(), actions.GET_CAS)),
);

const getCaEpic = action$ => action$.pipe(
  ofType(actions.GET_CA),
  mergeMap( ({ payload }) => makeRequestWithActions(certsApiCalls.getCA(payload.caId), actions.GET_CA)),
);

const getCertsEpic = action$ => action$.pipe(
  ofType(actions.GET_CERTS),
  mergeMap( () => makeRequestWithActions(certsApiCalls.getCerts(), actions.GET_CERTS)),
);


export {
  getCasEpic,
  getCaEpic,
  getCertsEpic
}
