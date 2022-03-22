import { failed, success } from "redux/utils"
import { actionType, status } from "redux/utils/constants"
import * as t from "./ActionTypes"
import { statusToColor } from "./utils"

function capitalizeFirstLetter (string) {
  string = string.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const initState = {
  status: status.IDLE,
  actionType: actionType.NONE,
  list: {},
  lastPrivateKey: ""
}

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case t.RESET_CURRENT_REQUEST_STATUS:
      return { ...state, status: status.IDLE, actionType: actionType.NONE }

    case t.GET_DMS_LIST:
      return { ...state, status: status.PENDING, actionType: actionType.READ }

    case failed(t.GET_DMS_LIST):
      return { ...state, status: status.FAILED }

    case success(t.GET_DMS_LIST):
      var currentList = {}

      action.payload.forEach(dms => {
        dms.status = capitalizeFirstLetter(dms.status)
        dms.status_color = statusToColor(dms.status)

        // dms.key_metadata.strength = capitalizeFirstLetter(dms.key_metadata.strength)
        // dms.key_metadata.strength_color = keyStrengthToColor(dms.key_metadata.strength)

        dms.key_metadata.strength = "ToDo"
        dms.key_metadata.strength_color = "red"

        currentList[dms.id] = dms
      })

      return { ...state, list: currentList, status: status.SUCCEEDED }

    case t.CREATE_DMS:
      return { ...state, status: status.PENDING, actionType: actionType.CREATE }

    case failed(t.CREATE_DMS):
      return { ...state, status: status.FAILED }

    case success(t.CREATE_DMS):
      var currentList = state.list
      var dms = action.payload.dms
      var key = action.payload.priv_key
      dms.status = capitalizeFirstLetter(dms.status)
      dms.status_color = statusToColor(dms.status)
      console.log(key)

      // dms.key_metadata.strength = capitalizeFirstLetter(dms.key_metadata.strength)
      // dms.key_metadata.strength_color = keyStrengthToColor(dms.key_metadata.strength)

      dms.key_metadata.strength = "ToDo"
      dms.key_metadata.strength_color = "red"

      currentList[dms.id] = dms

      return { ...state, status: status.SUCCEEDED, list: currentList, lastPrivateKey: key }

    case t.DECLINE_DMS_REQUEST:
      return { ...state, status: status.PENDING, actionType: actionType.UPDATE }

    case failed(t.DECLINE_DMS_REQUEST):
      return { ...state, status: status.FAILED }

    case success(t.DECLINE_DMS_REQUEST):
      return { ...state, status: status.SUCCEEDED }

    case t.REVOKE_DMS:
      return { ...state, status: status.PENDING, actionType: actionType.UPDATE }

    case failed(t.REVOKE_DMS):
      return { ...state, status: status.FAILED }

    case success(t.REVOKE_DMS):
      return { ...state, status: status.SUCCEEDED }

    case t.APPROVE_DMS_REQUEST:
      return { ...state, status: status.PENDING, actionType: actionType.UPDATE }

    case failed(t.APPROVE_DMS_REQUEST):
      return { ...state, status: status.FAILED }

    case success(t.APPROVE_DMS_REQUEST):
      return { ...state, status: status.SUCCEEDED }

    default:
      return state
  }
}

const getSelector = (state) => state.dmsenroller

export const isRequestInProgress = (state) => {
  const dmsEnrollerState = getSelector(state)
  return {
    status: dmsEnrollerState.status,
    actionType: dmsEnrollerState.actionType
  }
}

export const getDmsList = (state) => {
  const dmsEnrollerState = getSelector(state)
  const dmsKeys = Object.keys(dmsEnrollerState.list)
  const dmsList = dmsKeys.map(key => dmsEnrollerState.list[key])
  return dmsList
}

export const getDmsById = (state, dmsId) => {
  const dmsEnrollerState = getSelector(state)
  return dmsEnrollerState.list[dmsId]
}

export const lastPrivateKey = (state, dmsId) => {
  const dmsEnrollerState = getSelector(state)
  return dmsEnrollerState.lastPrivateKey
}
