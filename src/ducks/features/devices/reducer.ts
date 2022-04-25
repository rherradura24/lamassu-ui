/* eslint-disable prefer-const */
import { createReducer } from "typesafe-actions";
import { Device, HistoricalCert } from "./models";
import { ActionStatus, capitalizeFirstLetter, ORequestStatus, ORequestType } from "ducks/reducers_utils";
import { RootState } from "ducks/reducers";
import { actions, RootAction } from "ducks/actions";
import { keyStrengthToColor } from "../cas/utils";
import { deviceStatusToColor, historicalCertStatusToColor } from "./utils";

export interface DevicesState {
    status: ActionStatus
    list: Array<Device>
    totalDevices: number
    historyCertsStatus: ActionStatus

}

const initialState = {
    status: {
        isLoading: false,
        status: ORequestStatus.Idle,
        type: ORequestType.None
    },
    list: [],
    totalDevices: 0,
    historyCertsStatus: {
        isLoading: false,
        status: ORequestStatus.Idle,
        type: ORequestType.None
    }
};

export const devicesReducer = createReducer<DevicesState, RootAction>(initialState)
    .handleAction(actions.devicesActions.getDevicesAction.request, (state, action) => {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read }, list: [] };
    })

    .handleAction(actions.devicesActions.getDevicesAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.devicesActions.getDevicesAction.success, (state, action) => {
        console.log(action);

        let devices: Array<Device> = action.payload.devices;

        for (let i = 0; i < devices.length; i++) {
            devices[i].historicalCerts = [];
            devices[i].status = capitalizeFirstLetter(devices[i].status);
            devices[i].status_color = deviceStatusToColor(devices[i].status);
            devices[i].key_metadata.strength = capitalizeFirstLetter(devices[i].key_metadata.strength);
            devices[i].key_metadata.strength_color = keyStrengthToColor(devices[i].key_metadata.strength);
        }
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success }, list: devices, totalDevices: action.payload.total_devices };
    })

    .handleAction(actions.devicesActions.getDeviceByIDAction.request, (state, action) => {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read } };
    })

    .handleAction(actions.devicesActions.getDeviceByIDAction.success, (state, action) => {
        let newDevice: Device = new Device(action.payload);
        let devices: Array<Device> = state.list;
        newDevice.status = capitalizeFirstLetter(newDevice.status);
        newDevice.status_color = deviceStatusToColor(newDevice.status);
        newDevice.key_metadata.strength = capitalizeFirstLetter(newDevice.key_metadata.strength);
        newDevice.key_metadata.strength_color = keyStrengthToColor(newDevice.key_metadata.strength);
        newDevice.historicalCerts = [];

        const index = state.list.map(device => device.id).indexOf(newDevice.id);
        if (index === -1) {
            devices.push(newDevice);
        } else {
            devices[index] = newDevice;
        }

        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success }, list: devices };
    })

    .handleAction(actions.devicesActions.getDeviceByIDAction.failure, (state, action) => {
        console.log(action);
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.devicesActions.getDeviceCertHistoryAction.request, (state, action) => {
        return { ...state, historyCertsStatus: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read } };
    })

    .handleAction(actions.devicesActions.getDeviceCertHistoryAction.success, (state, action) => {
        let devices: Array<Device> = state.list;
        for (let i = 0; i < devices.length; i++) {
            // @ts-ignore
            if (devices[i].id === action.meta.deviceId!) {
                let historicalCerts: Array<HistoricalCert> = action.payload;
                for (let j = 0; j < historicalCerts.length; j++) {
                    historicalCerts[j].status = capitalizeFirstLetter(historicalCerts[j].status);
                    historicalCerts[j].status_color = historicalCertStatusToColor(historicalCerts[j].status);
                }
                devices[i].historicalCerts = historicalCerts.sort((a:HistoricalCert, b:HistoricalCert) => (a.creation_timestamp < b.creation_timestamp) ? 1 : ((b.creation_timestamp < a.creation_timestamp) ? -1 : 0));
            }
        }
        return { ...state, historyCertsStatus: { ...state.historyCertsStatus, isLoading: false, status: ORequestStatus.Success }, list: devices };
    })

    .handleAction(actions.devicesActions.getDeviceCertHistoryAction.failure, (state, action) => {
        return { ...state, historyCertsStatus: { ...state.historyCertsStatus, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.devicesActions.revokeActiveDeviceCertificateAction.request, (state, action) => {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Delete } };
    })
    .handleAction(actions.devicesActions.revokeActiveDeviceCertificateAction.success, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: true, status: ORequestStatus.Success } };
    })
    .handleAction(actions.devicesActions.revokeActiveDeviceCertificateAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: true, status: ORequestStatus.Failed } };
    });

const getSelector = (state: RootState): DevicesState => state.devices;

export const getDevices = (state: RootState): Array<Device> => {
    const reducer = getSelector(state);
    return reducer.list;
};
export const getTotalDevices = (state: RootState): number => {
    const reducer = getSelector(state);
    return reducer.totalDevices;
};

export const getDevice = (state: RootState, id: string): Device | undefined => {
    const reducer = getSelector(state);
    const filteredList = reducer.list.filter((ca: Device) => ca.id === id);
    if (filteredList.length === 1) {
        return filteredList[0];
    }
    return undefined;
};

export const getRequestStatus = (state: RootState): ActionStatus => {
    const reducer = getSelector(state);
    return reducer.status;
};

export const getHistoricalCertRequestStatus = (state: RootState): ActionStatus => {
    const reducer = getSelector(state);
    return reducer.historyCertsStatus;
};
