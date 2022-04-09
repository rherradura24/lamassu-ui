import { Epic } from "redux-observable";
import { RootState } from "../../reducers";
import * as actions from "./actions";
import { filter, exhaustMap, catchError, map } from "rxjs/operators";
import { from, of, tap, forkJoin, defaultIfEmpty } from "rxjs";

import * as apicalls from "./apicalls";
import { isActionOf, PayloadAction } from "typesafe-actions";
import { RootAction } from "ducks/actions";

export const getCloudConnectorsEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getConnectorsAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action) =>
            from(apicalls.getCloudConnectors()).pipe(
                map(actions.getConnectorsAction.success),
                catchError((message) => of(actions.getConnectorsAction.failure(message)))
            )
        )
    );

export const forceSyncCloudConnector: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.forceSynchronizeCloudConnectorAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.ForceSynchronizeCloudConnector>) =>
            from(apicalls.synchronizeCloudConnectors(action.payload.connectorID, action.payload.caName)).pipe(
                tap((item: any) => console.log("%c Epic ", "background:#d71000; border-radius:5px;font-weight: bold;", "", item)),
                exhaustMap(() =>
                    from(apicalls.fireEvent("io.lamassu.ca.create", {
                        name: action.payload.caName,
                        serial_number: action.payload.caSerialnumber,
                        cert: action.payload.caCetificate
                    })).pipe(
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
        filter(isActionOf(actions.getCloudConnectorDevicesConfigAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#985677; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.GetDevicesConfig>) =>
            forkJoin(
                action.payload.connectorIDs.map(async connectorID => {
                    const devices = await apicalls.getDeviceConfig(connectorID);
                    return new Promise(resolve => resolve({ devices_config: devices, connector_id: connectorID }));
                })
            ).pipe(
                defaultIfEmpty({}),
                tap((item: any) => console.log("%c Epic ", "background:#887751; border-radius:5px;font-weight: bold;", "", item)),
                map(actions.getCloudConnectorDevicesConfigAction.success),
                catchError((message) => of(actions.getCloudConnectorDevicesConfigAction.failure(message)))
            )
        )
    );

export const updateAccessPolicyEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.updateAccessPolicyAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.UpdateAccessPolicy>) =>
            from(apicalls.updateAccessPolicy(action.payload.body.connector_id, action.payload.body.ca_name, action.payload.body.policy)).pipe(
                map(actions.updateAccessPolicyAction.success),
                catchError((message) => of(actions.updateAccessPolicyAction.failure(message)))
            )
        )
    );
