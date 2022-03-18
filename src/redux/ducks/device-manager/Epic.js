import { ofType } from "redux-observable"
import { makeRequestWithActions } from "redux/utils"
import { mergeMap } from "rxjs/operators"
import * as t from "./ActionTypes"
import * as lamassuDevManagerApi from "./ApiCalls"

export const getDevicesEpic = action$ => action$.pipe(
  ofType(t.GET_DEVICES),
  mergeMap(() => makeRequestWithActions(lamassuDevManagerApi.getDevices(), t.GET_DEVICES))
)
