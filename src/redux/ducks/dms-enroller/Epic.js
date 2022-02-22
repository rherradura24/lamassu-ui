import { ofType } from 'redux-observable';
import { makeRequestWithActions } from 'redux/utils';
import { mergeMap } from 'rxjs/operators';
import * as t from "./ActionTypes"
import * as lamassuDmsEnrollerApi from "./ApiCalls";

export const getDmsListEpic = action$ => action$.pipe(
    ofType(t.GET_DMS_LIST),
    mergeMap(() => makeRequestWithActions(lamassuDmsEnrollerApi.getDmsList(), t.GET_DMS_LIST)),
);