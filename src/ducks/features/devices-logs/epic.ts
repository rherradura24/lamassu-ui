import { Epic } from "redux-observable";
import { RootState } from "../../reducers";
import * as actions from "./actions";
import { filter, exhaustMap, catchError, map } from "rxjs/operators";
import { from, of, tap } from "rxjs";
import * as notificationsActions from "ducks/features/notifications/actions";

import * as apicalls from "./apicalls";
import { isActionOf, PayloadAction } from "typesafe-actions";
import { RootAction } from "ducks/actions";

export const getDeviceLogs: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getDeviceLogs.request)),
        tap((item: any) => console.log("%c Epic ", "background:#25eee3; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.GetDeviceLogs>) =>
            from(apicalls.getDeviceLogs(
                action.payload.deviceID,
                action.payload.limit,
                action.payload.offset,
                action.payload.sortMode,
                action.payload.sortField,
                action.payload.filterQuery
            )).pipe(
                map((val) => actions.getDeviceLogs.success(val, {
                    deviceID: action.payload.deviceID,
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    sortMode: action.payload.sortMode,
                    sortField: action.payload.sortField,
                    filterQuery: action.payload.filterQuery
                })),
                catchError((message) => of(actions.getDeviceLogs.failure(message)))
            )
        )
    );

export const reportError: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter((rootAction, value) => isActionOf([
            actions.getDeviceLogs.failure
        ], rootAction)),
        tap((item: any) => console.log("%c Epic ", "background:#884101; border-radius:5px;font-weight: bold;", "", item)),
        map(({ type, payload }: { type: string, payload: Error }) => { return notificationsActions.addNotificationAction({ message: type + ": " + payload.message, type: "ERROR" }); })
    );
