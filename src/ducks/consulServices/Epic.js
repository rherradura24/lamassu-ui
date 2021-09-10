import { ofType } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { makeRequestWithActions } from "ducks/utils";
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"
import * as consulApiCalls from "./ApiCalls";
import { from } from 'rxjs';

const getConsulServices = action$ => action$.pipe(
    ofType(actions.GET_SERVICES),
    mergeMap(() => makeRequestWithActions(consulApiCalls.getConsulServices(), actions.GET_SERVICES)),

);
const getConsulServicesSucess = action$ => action$.pipe(
    ofType(actions.GET_SERVICES_SUCCESS),
    mergeMap(response => from(Object.keys(response.payload))),  // "response" is the result of the "makeRequestWithActions" func. We neeed to get an array {ca: {}, vault:{}} => [ca, vault]
    mergeMap(svc => {console.log(svc); return makeRequestWithActions(consulApiCalls.getServiceHealth({serviceName: svc}), actions.GET_SERVICE_HEALTH, {serviceName: svc})})
);

export {
    getConsulServices,
    getConsulServicesSucess
}