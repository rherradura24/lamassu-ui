import { ofType } from 'redux-observable';
import { failed, makeRequestWithActions, success } from 'redux/utils';
import { mergeMap, tap, switchMap } from 'rxjs/operators';
import * as t from "./ActionTypes"
import * as a from "./Actions"
import * as lamassuCloudProxyApi from "./ApiCalls";
import notificationsDuck from "redux/ducks/notifications";
import { of, from } from 'rxjs';

// GET_CLOUD_CONNECTORS

export const getCloudConnectorsEpic = action$ => action$.pipe(
    ofType(t.GET_CLOUD_CONNECTORS),
    mergeMap(() => makeRequestWithActions(lamassuCloudProxyApi.getCloudConnectors(), t.GET_CLOUD_CONNECTORS)),
);

export const getCloudConnectorsEpicError = action$ => action$.pipe(
    ofType(failed(t.GET_CLOUD_CONNECTORS)),
    mergeMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting Cloud Connectors`))),
);


// SYNCHRONIZE_CONNECTOR

export const synchronizeCloudConnectorsEpic = action$ => action$.pipe(
    ofType(t.SYNCHRONIZE_CONNECTOR),
    tap(item => console.log("%c Epic-CloudProxy ", "background:#8BC63E; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload }) => makeRequestWithActions(lamassuCloudProxyApi.synchronizeCloudConnectors(payload.body), t.SYNCHRONIZE_CONNECTOR,  {...payload})),
);

export const synchronizeCloudConnectorsEpicError = action$ => action$.pipe(
    ofType(failed(t.SYNCHRONIZE_CONNECTOR)),
    mergeMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting synchronizing cloud connector: ${payload}`))),
);

// SYNCHRONIZE_CONNECTOR

export const fireEventCloudProxyEpic = action$ => action$.pipe(
    ofType(t.FIRE_EVENT),
    tap(item => console.log("%c Epic-CloudProxy ", "background:#8BC63E; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload }) => makeRequestWithActions(lamassuCloudProxyApi.fireEvent(payload.body), t.FIRE_EVENT, {...payload})),
);

export const fireEventCloudProxyEpicError = action$ => action$.pipe(
    ofType(failed(t.FIRE_EVENT)),
    mergeMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting firing cloud event: ${payload}`))),
);


// FORCE_SYNCHRONIZE_CONNECTOR

export const forceSynchronizeCloudConnectorsEpic = action$ => action$.pipe(
    ofType(t.FORCE_SYNCHRONIZE_CONNECTOR),
    tap(item => console.log("%c Epic-CloudProxy ", "background:#8BC63E; border-radius:5px;font-weight: bold;", "", item)),
    switchMap(({ payload }) => 
        makeRequestWithActions(lamassuCloudProxyApi.synchronizeCloudConnectors({
            connector_id: payload.connector_id,
            ca_name: payload.ca_name,
        }), t.SYNCHRONIZE_CONNECTOR, {...payload})
    ),
    tap(item => console.log("%c Epic-CloudProxy ", "background:#8BC63E; border-radius:5px;font-weight: bold;", "", item)),
    switchMap(({ payload, meta }) =>
        makeRequestWithActions(lamassuCloudProxyApi.fireEvent({
            type: "io.lamassu.ca.create",
            specversion: "1.0",
            source: "lamassu-ui",
            id: "123",
            time: new Date(),
            data: {
                name: meta.ca_name, 
                serial_number: meta.ca_serial_number, 
                cert: meta.ca_certificate 
            }
        }), t.FORCE_SYNCHRONIZE_CONNECTOR, {...payload}
    )),
);

export const forceSynchronizeCloudConnectorsEpicError = action$ => action$.pipe(
    ofType(failed(t.FORCE_SYNCHRONIZE_CONNECTOR)),
    mergeMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting forcing synchronization for cloud connector: ${payload}`))),
);

export const forceSynchronizeCloudConnectorsEpicSuccess = action$ => action$.pipe(
    ofType(success(t.FORCE_SYNCHRONIZE_CONNECTOR)),
    mergeMap(({ payload }) => of(a.getCloudConnectors())),
);


// UPDATE_ACCESS_POLICY

export const updateAccessPolicyCloudProxyEpic = action$ => action$.pipe(
    ofType(t.UPDATE_ACCESS_POLICY),
    tap(item => console.log("%c Epic-CloudProxy ", "background:#8BC63E; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({ payload }) => makeRequestWithActions(lamassuCloudProxyApi.updateAccessPolicy(payload.connector_id, payload.body), t.UPDATE_ACCESS_POLICY, {...payload})),
);

export const updateAccessPolicyCloudProxyEpicError = action$ => action$.pipe(
    ofType(failed(t.UPDATE_ACCESS_POLICY)),
    mergeMap(({ payload }) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while updating access policy: ${payload}`))),
);
