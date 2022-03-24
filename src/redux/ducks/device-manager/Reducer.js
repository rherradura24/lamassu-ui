import { failed, success } from "redux/utils"
import { actionType, status } from "redux/utils/constants"
import * as t from "./ActionTypes"

const initState = {
  status: status.IDLE,
  actionType: actionType.NONE,
  list: {}
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case t.GET_DEVICES:
      return { ...state, status: status.PENDING, actionType: actionType.READ }

    case success(t.GET_DEVICES):
      var currentList = {}

      action.payload.forEach(device => {
        currentList[device.id] = device
      })

      return { ...state, list: currentList, status: status.SUCCEEDED }

    case failed(t.GET_DEVICES):
      return { ...state, status: status.FAILED }

    default:
      return state
  }
}

const getSelector = (state) => state.devices

export const isRequestInProgress = (state) => {
  const devManagerReducer = getSelector(state)
  return {
    status: devManagerReducer.status,
    actionType: devManagerReducer.actionType
  }
}

export const getDevices = (state) => {
  const devManagerReducer = getSelector(state)
  const devicesKeys = Object.keys(devManagerReducer.list)
  const devicesList = devicesKeys.map(key => devManagerReducer.list[key])
  return devicesList
}

export const getDeviceById = (state, deviceId) => {
  const devManagerReducer = getSelector(state)
  return devManagerReducer.list[deviceId]
}
