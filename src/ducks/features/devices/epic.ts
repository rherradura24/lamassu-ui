import { Epic } from "redux-observable";
import { RootState } from "../../reducers";
import * as actions from "./actions";
import { filter, exhaustMap, catchError, map } from "rxjs/operators";
import { from, of, tap } from "rxjs";
import * as notificationsActions from "ducks/features/notifications/actions";

import * as apicalls from "./apicalls";
import { isActionOf, PayloadAction } from "typesafe-actions";
import { RootAction } from "ducks/actions";

export const getDevicesEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getDevicesAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.GetDevicesAction>) =>
            from(apicalls.getDevices(
                action.payload.limit,
                action.payload.offset,
                action.payload.sortMode,
                action.payload.sortField,
                action.payload.filterQuery
            )).pipe(
                map(actions.getDevicesAction.success),
                catchError((message) => of(actions.getDevicesAction.failure(message)))
            )
        )
    );

export const getStatsEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getStatsAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.GetStats>) =>
            from(apicalls.getStats(action.payload.force)).pipe(
                map(actions.getStatsAction.success),
                catchError((message) => of(actions.getStatsAction.failure(message)))
            )
        )
    );

export const getDeviceByIDEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getDeviceByIDAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.GetDeviceByIDAction>) =>
            from(apicalls.getDeviceByID(action.payload.deviceID)).pipe(
                map((val) => actions.getDeviceByIDAction.success(val, { deviceID: action.payload.deviceID })),
                catchError((message) => of(actions.getDeviceByIDAction.failure(message)))
            )
        )
    );

export const triggerGetCertHistoryOnGetDeviceByIDSuccess: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getDeviceByIDAction.success)),
        map((val: any) => { return actions.getDeviceCertHistoryAction.request({ deviceID: val.meta.deviceID }); })
    );

export const getDeviceCertHistoryEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getDeviceCertHistoryAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.GetDeviceCertHistory>) =>
            from(apicalls.getDeviceCertHistory(action.payload.deviceID)).pipe(
                map((val) => actions.getDeviceCertHistoryAction.success(val, { deviceId: action.payload.deviceID })),
                catchError((message) => of(actions.getDeviceCertHistoryAction.failure(message)))
            )
        )
    );

export const revokeActiveDeviceCertificateEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.revokeActiveDeviceCertificateAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.RevokeActiveDeviceCertificate>) =>
            from(apicalls.revokeActiveDeviceCertificate(action.payload.deviceID)).pipe(
                map((val) => actions.revokeActiveDeviceCertificateAction.success(val, { deviceID: action.payload.deviceID })),
                catchError((message) => of(actions.revokeActiveDeviceCertificateAction.failure(message)))
            )
        )
    );

export const triggerGetDeviceByIDOnRevokeSuccessEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.revokeActiveDeviceCertificateAction.success)),
        map((val: any) => { return actions.getDeviceByIDAction.request({ deviceID: val.meta.deviceID }); })
    );

export const registerDeviceEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.registerDeviceAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.RegisterDevice>) =>
            from(apicalls.registerDevice(
                action.payload.deviceID,
                action.payload.deviceAlias,
                action.payload.deviceDescription,
                action.payload.tags,
                action.payload.icon,
                action.payload.color,
                action.payload.dmsID
            )).pipe(
                map(actions.registerDeviceAction.success),
                catchError((message) => of(actions.registerDeviceAction.failure(message)))
            )
        )
    );

export const reportError: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter((rootAction, value) => isActionOf([
            actions.getDevicesAction.failure,
            actions.getDeviceCertHistoryAction.failure,
            actions.getDeviceByIDAction.failure,
            actions.revokeActiveDeviceCertificateAction.failure,
            actions.registerDeviceAction.failure
        ], rootAction)),
        tap((item: any) => console.log("%c Epic ", "background:#884101; border-radius:5px;font-weight: bold;", "", item)),
        map(({ type, payload }: { type: string, payload: Error }) => { return notificationsActions.addNotificationAction({ message: type + ": " + payload.message, type: "ERROR" }); })
    );
