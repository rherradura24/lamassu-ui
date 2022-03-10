import { ofType } from 'redux-observable';
import { failed, makeRequestWithActions, success } from 'redux/utils';
import { mergeMap, tap } from 'rxjs/operators';
import * as t from "./ActionTypes"
import * as a from "./Actions"
import * as lamassuCloudProxyApi from "./ApiCalls";
import  notificationsDuck from "redux/ducks/notifications";
import { of, from } from 'rxjs';

// GET_CLOUD_CONNECTORS

export const getCloudConnectorsEpic = action$ => action$.pipe(
    ofType(t.GET_CLOUD_CONNECTORS),
    mergeMap(() => makeRequestWithActions(lamassuCloudProxyApi.getCloudConnectors(), t.GET_CLOUD_CONNECTORS)),
);

export const getCloudConnectorsEpicError= action$ => action$.pipe(
    ofType(failed(t.GET_CLOUD_CONNECTORS)),
    mergeMap(({payload}) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting Cloud Connectors: ${payload}`))),
);


// SYNCHRONIZE_CONNECTOR

export const synchronizeCloudConnectorsEpic = action$ => action$.pipe(
    ofType(t.SYNCHRONIZE_CONNECTOR),
    // tap(item => console.log("%c Epic-CloudProxy ", "background:#8BC63E; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({payload}) => makeRequestWithActions(lamassuCloudProxyApi.synchronizeCloudConnectors(payload.body), t.SYNCHRONIZE_CONNECTOR)),
);

export const synchronizeCloudConnectorsEpicError= action$ => action$.pipe(
    ofType(failed(t.SYNCHRONIZE_CONNECTOR)),
    mergeMap(({payload}) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting synchronizing cloud connector: ${payload}`))),
);


// SYNCHRONIZE_CONNECTOR

export const getSynchronizeCAsEpicOnGetCloudConnectorSuccess= action$ => action$.pipe(
    ofType(success(t.GET_CLOUD_CONNECTORS)),
    // tap(item => console.log("%c Epic-CloudProxy ", "background:#8BC63E; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({payload}) => from(payload.map(cloudConnector => cloudConnector.id))),
    // tap(item => console.log("%c Epic-CloudProxy ", "background:#8BC63E; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(connectorId => of(a.getSynchronizeCAsByCloudConnector(connectorId)))
);


export const getSynchronizeCAsEpic = action$ => action$.pipe(
    ofType(t.GET_SYNCHRONIZED_CAS_BY_CONNECTOR),
    // tap(item => console.log("%c Epic-CloudProxy ", "background:#8BC63E; border-radius:5px;font-weight: bold;", "", item)),
    mergeMap(({payload}) => makeRequestWithActions(lamassuCloudProxyApi.getSynchronizeCAs(payload.connectorId), t.GET_SYNCHRONIZED_CAS_BY_CONNECTOR, {connectorId: payload.connectorId})),
);

export const getSynchronizeCAsEpicError= action$ => action$.pipe(
    ofType(failed(t.GET_SYNCHRONIZED_CAS_BY_CONNECTOR)),
    mergeMap(({payload}) => of(notificationsDuck.actions.addNotification(notificationsDuck.constants.ERROR, `Error while getting synchronizing cloud connector's CAs: ${payload}`))),
);