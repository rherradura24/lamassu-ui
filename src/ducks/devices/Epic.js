import { ofType } from 'redux-observable';
import { mapTo, mergeMap, map } from 'rxjs/operators';
import { makeRequestWithActions } from "ducks/utils";
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"
import * as devicesApiCalls from "./ApiCalls";
import { from, of } from 'rxjs';

const getDevices = action$ => action$.pipe(
    ofType(actions.GET_ALL_DEVICES),
    mergeMap(() => makeRequestWithActions(devicesApiCalls.getAllDevices(), actions.GET_ALL_DEVICES)),
);

const getDeviceById = action$ => action$.pipe(
    ofType(actions.GET_DEVICE),
    mergeMap(({payload}) => makeRequestWithActions(devicesApiCalls.getDeviceById(payload), actions.GET_DEVICE)),
);

const getDeviceLogs = action$ => action$.pipe(
    ofType(actions.GET_DEVICE_SUCCESS),
    mergeMap(({payload}) => makeRequestWithActions(devicesApiCalls.getDeviceLogs(payload), actions.GET_DEVICE_LOGS, {id: payload.id})),
);

const provisionDevice = action$ => action$.pipe(
    ofType(actions.PROVISION_DEVICE),
    mergeMap(({payload}) => makeRequestWithActions(devicesApiCalls.provisionDevice(payload), actions.PROVISION_DEVICE, {id: payload.id})),
);

const createDevice = action$ => action$.pipe(
    ofType(actions.CREATE_DEVICE),
    mergeMap(({payload}) => makeRequestWithActions(devicesApiCalls.createDevice(payload), actions.CREATE_DEVICE)),
);

const refreshDevices = action$ => action$.pipe(
    ofType(actions.CREATE_DEVICE_SUCCESS),
    mergeMap(() => makeRequestWithActions(devicesApiCalls.getAllDevices(), actions.GET_ALL_DEVICES)),
);

const refreshDevice = action$ => action$.pipe(
    ofType(actions.PROVISION_DEVICE_SUCCESS, actions.DELETE_DEVICE_SUCCESS, actions.REVOKE_DEVICE_CERT_SUCCESS),
    mergeMap(({meta}) => makeRequestWithActions(devicesApiCalls.getDeviceById(meta), actions.GET_DEVICE)),
);

const revokeDeviceCert = action$ => action$.pipe(
    ofType(actions.REVOKE_DEVICE_CERT),
    mergeMap(({payload})=> makeRequestWithActions(devicesApiCalls.revokeDeviceCert(payload), actions.REVOKE_DEVICE_CERT, {id: payload.id})),
);

const deleteDevice = action$ => action$.pipe(
    ofType(actions.DELETE_DEVICE),
    mergeMap(({payload})=> makeRequestWithActions(devicesApiCalls.deleteDevice(payload), actions.DELETE_DEVICE, {id: payload.id})),
);

const notifyDeviceRemovalSuccess = (action$, state$) => action$.pipe(
    ofType(actions.DELETE_DEVICE_SUCCESS),
    mapTo({ type: notificationActions.NOTIFY, payload: {msg: "Device successfully removed", type: "success"} })

);
/// General ERROR Notify
const notifyError = (action$, state$) => action$.pipe(
    ofType(actions.CREATE_DEVICE_ERROR, actions.DELETE_DEVICE_ERROR, actions.GET_ALL_DEVICES_ERROR, actions.GET_DEVICE_ERROR, actions.PROVISION_DEVICE_ERROR, actions.GET_DEVICE_LOGS_ERROR ),
    mergeMap(({ payload, meta })=> {
      return of({ type: notificationActions.NOTIFY, payload: {msg: payload, type: "error"} })
    })
);

export {
    getDevices,
    getDeviceById,
    getDeviceLogs,
    createDevice,
    provisionDevice,
    revokeDeviceCert,
    refreshDevices,
    refreshDevice,
    deleteDevice,
    notifyError,
    notifyDeviceRemovalSuccess,
}