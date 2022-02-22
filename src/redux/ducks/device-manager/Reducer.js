import { success } from "redux/utils";
import * as t from "./ActionTypes"

const initState = {
    loading: false,
    loaded: false,
    list: {}
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case success(t.GET_DEVICES):
            var currentList = {}

            action.payload.forEach(device => {
                currentList[device.id] = device
            });

            return {...state, list: currentList };
        default:
            return state;
    }
}

const getSelector = (state) => state.devices

export const getDevices = (state) => {
    const devices = getSelector(state)
    const devicesKeys = Object.keys(devices.list)
    const devicesList = devicesKeys.map(key => devices.list[key])
    return devicesList;
}