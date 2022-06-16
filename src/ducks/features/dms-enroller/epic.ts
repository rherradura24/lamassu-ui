import { Epic } from "redux-observable";
import { RootState } from "../../reducers";
import * as actions from "./actions";
import * as notificationsActions from "ducks/features/notifications/actions";
import { filter, exhaustMap, catchError, map } from "rxjs/operators";
import { from, of, tap } from "rxjs";

import * as apicalls from "./apicalls";
import { isActionOf, PayloadAction } from "typesafe-actions";
import { RootAction } from "ducks/actions";

export const getCloudConnectorsEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getDMSListAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.GetDMSsAction>) =>
            from(apicalls.getDMSList(
                action.payload.limit,
                action.payload.offset,
                action.payload.sortMode,
                action.payload.sortField,
                action.payload.filterQuery
            )).pipe(
                map(actions.getDMSListAction.success),
                catchError((message) => of(actions.getDMSListAction.failure(message)))
            )
        )
    );
export const createDMSEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.createDMSWithFormAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.CreateDMSRequest>) =>
            from(apicalls.createDMS(action.payload.dmsName, action.payload.form)).pipe(
                map(actions.createDMSWithFormAction.success),
                catchError((message) => of(actions.createDMSWithFormAction.failure(message)))
            )
        )
    );
export const approveDMSEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.approveDMSRequestAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.ApproveDMSRequest>) =>
            from(apicalls.updateDMS(action.payload.dmsID, action.payload.status, action.payload.authorized_cas)).pipe(
                map(actions.approveDMSRequestAction.success),
                catchError((message) => of(actions.approveDMSRequestAction.failure(message)))
            )
        )
    );

export const revokeDMSEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.revokeDMSAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.RevokeDMSRequest>) =>
            from(apicalls.updateDMS(action.payload.dmsID, action.payload.status)).pipe(
                map(actions.revokeDMSAction.success),
                catchError((message) => of(actions.revokeDMSAction.failure(message)))
            )
        )
    );

export const declimeDMSEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.declineDMSRequestAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.DeclineDMSRequest>) =>
            from(apicalls.updateDMS(action.payload.dmsID, action.payload.status)).pipe(
                map(actions.declineDMSRequestAction.success),
                catchError((message) => of(actions.declineDMSRequestAction.failure(message)))
            )
        )
    );

export const updateAfterSuccessStatusChangeEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter((rootAction, value) => isActionOf([
            actions.approveDMSRequestAction.success,
            actions.declineDMSRequestAction.success,
            actions.revokeDMSAction.success
        ], rootAction)),
        tap((item: any) => console.log("%c Epic ", "background:#884101; border-radius:5px;font-weight: bold;", "", item)),
        map(() => actions.getDMSListAction.request({
            filterQuery: [],
            limit: 10,
            offset: 0,
            sortField: "id",
            sortMode: "asc"
        }))
    );

export const reportError: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter((rootAction, value) => isActionOf([
            actions.getDMSListAction.failure,
            actions.createDMSWithFormAction.failure,
            actions.approveDMSRequestAction.failure,
            actions.declineDMSRequestAction.failure,
            actions.revokeDMSAction.failure
        ], rootAction)),
        tap((item: any) => console.log("%c Epic ", "background:#884101; border-radius:5px;font-weight: bold;", "", item)),
        map(({ type, payload }: {type: string, payload: Error}) => { return notificationsActions.addNotificationAction({ message: type + ": " + payload.message, type: "ERROR" }); })
    );
