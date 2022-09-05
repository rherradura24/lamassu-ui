import { Epic } from "redux-observable";
import { RootState } from "../../reducers";
import * as actions from "./actions";
import { filter, exhaustMap, catchError, map } from "rxjs/operators";
import { from, of, tap, forkJoin, defaultIfEmpty } from "rxjs";

import * as apicalls from "./apicalls";
import { isActionOf, PayloadAction } from "typesafe-actions";
import { RootAction } from "ducks/actions";

export const getInfoEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getInfoAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action) =>
            from(apicalls.getInfo()).pipe(
                map(actions.getInfoAction.success),
                catchError((message) => of(actions.getInfoAction.failure(message)))
            )
        )
    );

export const getCloudConnectorsEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getConnectorsAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#881; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action) =>
            from(apicalls.getCloudConnectors()).pipe(
                tap((item: any) => console.log("%c Epic ", "background:#255; border-radius:5px;font-weight: bold;", "", item)),
                map(actions.getConnectorsAction.success),
                tap((item: any) => console.log("%c Epic ", "background:#25ee32; border-radius:5px;font-weight: bold;", "", item)),
                catchError((message) => of(actions.getConnectorsAction.failure(message)))
            )
        )
    );

export const forceSyncCloudConnector: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.forceSynchronizeCloudConnectorAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.ForceSynchronizeCloudConnector>) =>
            from(apicalls.synchronizeCloudConnectors(action.payload.connectorID, action.payload.eventPayload.name)).pipe(
                tap((item: any) => console.log("%c Epic ", "background:#d71000; border-radius:5px;font-weight: bold;", "", item)),
                exhaustMap(() =>
                    from(apicalls.fireEvent(action.payload.eventType, action.payload.eventPayload)).pipe(
                        tap((item: any) => console.log("%c Epic ", "background:#d71; border-radius:5px;font-weight: bold;", "", item)),
                        map(actions.getConnectorsAction.success),
                        tap((item: any) => console.log("%c Epic ", "background:#50d333; border-radius:5px;font-weight: bold;", "", item)),
                        catchError((message) => of(actions.forceSynchronizeCloudConnectorAction.failure(message)))
                    )
                ),
                catchError((message) => of(actions.forceSynchronizeCloudConnectorAction.failure(message)))
            )
        )
    );

export const getDeviceConfigEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getCloudConnectorDeviceConfigAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#985677; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.GetDevicesConfig>) =>
            forkJoin(
                action.payload.connectorIDs.map(async connectorID => {
                    try {
                        const device = await apicalls.getDeviceConfig(connectorID, action.payload.deviceID);
                        return new Promise(resolve => resolve({ device_config: device, connector_id: connectorID }));
                    } catch (er) {
                        return new Promise(resolve => resolve({ device_config: null, connector_id: connectorID }));
                    }
                })
            ).pipe(
                defaultIfEmpty({}),
                tap((item: any) => console.log("%c Epic ", "background:#887751; border-radius:5px;font-weight: bold;", "", item)),
                map((val) => actions.getCloudConnectorDeviceConfigAction.success(val, { deviceID: action.payload.deviceID }))
                // catchError((message) => of(actions.getCloudConnectorDeviceConfigAction.failure(message)))
            )
        )
    );

export const updateConfigurationEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.updateConfiguration.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.UpdateConfigurationRequest>) =>
            from(apicalls.updateConfiguration(action.payload.connector_id, action.payload.configuration)).pipe(
                map(actions.updateConfiguration.success),
                catchError((message) => of(actions.updateConfiguration.failure(message)))
            )
        )
    );

export const triggetGetConnectorsOnUpdateConfigurationSuccess: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.updateConfiguration.success)),
        map((val: any) => { return actions.getConnectorsAction.request(); })
    );

export const updateDeviceCertificateStatus: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.updateDeviceCertificateStatusAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.UpdateDeviceCertificateStatus>) =>
            from(apicalls.updateDeviceCertificateStatus(action.payload.connectorID, action.payload.deviceID, action.payload.caName, action.payload.serialNumber, action.payload.status)).pipe(
                map((val) => actions.updateDeviceCertificateStatusAction.success({}, { deviceID: action.payload.deviceID, connectorID: action.payload.connectorID })),
                catchError((message) => of(actions.updateDeviceCertificateStatusAction.failure(message)))
            )
        )
    );

export const triggerRefreshUpdateDeviceConfig: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.updateDeviceCertificateStatusAction.success)),
        map((val: any) => {
            return actions.getCloudConnectorDeviceConfigAction.request({
                connectorIDs: [val.meta.connectorID],
                deviceID: val.meta.deviceID
            });
        })
    );
