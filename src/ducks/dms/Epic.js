import { ofType } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { makeRequestWithActions } from "ducks/utils";
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"
import * as dmsApiCalls from "./ApiCalls";

const getDmsEpic = action$ => action$.pipe(
    ofType(actions.GET_ALL_DMS),
    mergeMap(() => makeRequestWithActions(dmsApiCalls.getAllDms(), actions.GET_ALL_DMS)),
);

export {
    getDmsEpic
}