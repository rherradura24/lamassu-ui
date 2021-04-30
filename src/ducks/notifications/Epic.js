import { ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';
import * as actions from "./ActionTypes"


const notifyEpic = action$ => action$.pipe(
    ofType(actions.NOTIFY),
    delay(3000),
    mapTo({ type: actions.NOTIFY_SUCCESS })
);

export {
  notifyEpic
}
