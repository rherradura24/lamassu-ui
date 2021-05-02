import { ofType } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { makeRequestWithActions } from "ducks/utils";
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"
import * as caApiCalls from "./ApiCalls";

const getCasEpic = action$ => action$.pipe(
  ofType(actions.GET_CAS),
  mergeMap(() => makeRequestWithActions(caApiCalls.getCAs(), actions.GET_CAS)),
);

const getCaEpic = action$ => action$.pipe(
  ofType(actions.GET_CA),
  mergeMap( ({ payload }) => makeRequestWithActions(caApiCalls.getCA(payload.caId), actions.GET_CA)),
);


export {
  getCasEpic,
  getCaEpic,
}
