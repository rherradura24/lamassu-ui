import { failed, success } from "redux/utils";
import * as t from "./ActionTypes"

const initState = {
    requestInProgress: false,
    refresh: false,
    list: {}
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case t.GET_DEVICES:
            return { ...state, requestInProgress: true, refresh: true };

        case success(t.GET_DEVICES):
            var currentList = {}

            action.payload.forEach(device => {
                currentList[device.id] = device
            });

            return { ...state, list: currentList, requestInProgress: false, refresh: false };

        case failed(t.GET_DEVICES):
            return { ...state, requestInProgress: false, refresh: false };

        default:
            return state;
    }
}

const getSelector = (state) => state.devices

export const isRequestInProgress = (state) => {
    const devManagerReducer = getSelector(state)
    return devManagerReducer.requestInProgress;
}


export const getDevices = (state) => {
    const devManagerReducer = getSelector(state)
    const devicesKeys = Object.keys(devManagerReducer.list)
    const devicesList = devicesKeys.map(key => devManagerReducer.list[key])
    return devicesList;
}

export const getDeviceById = (state, deviceId) => {
    const devManagerReducer = getSelector(state)
    return devManagerReducer.list[deviceId];
}