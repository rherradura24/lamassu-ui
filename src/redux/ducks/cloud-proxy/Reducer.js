import { success, failed } from "redux/utils"
import { actionType, status } from "redux/utils/constants"
import * as t from "./ActionTypes"
import { cloudProviders } from "./Constants"
import { awsCaStatusColor, awsPolicyStatusColor, cloudConnectorStatusToColor } from "./utils"

function capitalizeFirstLetter(string) {
  string = string.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const initState = {
  status: status.IDLE,
  actionType: actionType.NONE,
  cloudConnectorsList: {}
}

export const reducer = (state = initState, action) => {
  // console.log(action, state);
  switch (action.type) {
    case t.GET_CLOUD_CONNECTORS:
      return { ...state, status: status.PENDING, actionType: actionType.READ }

    case failed(t.GET_CLOUD_CONNECTORS):
      return { ...state, status: status.FAILED }

    case success(t.GET_CLOUD_CONNECTORS):
      var currentList = {}

      action.payload.forEach(cloudConnector => {
        // Standarize Strings
        cloudConnector.status = capitalizeFirstLetter(cloudConnector.status)
        cloudConnector.status_color = cloudConnectorStatusToColor(cloudConnector.status)
        for (let i = 0; i < cloudConnector.synchronized_cas.length; i++) {
          var syncCA = cloudConnector.synchronized_cas[i]
          if (cloudConnector.cloud_provider == cloudProviders.AWS) {
            syncCA.consistency_status = capitalizeFirstLetter(syncCA.consistency_status)

            if (syncCA.config && syncCA.config.status) {
              syncCA.config.status = capitalizeFirstLetter(syncCA.config.status)
              syncCA.config.status_color = awsCaStatusColor(syncCA.config.status)
            }
            if (syncCA.config && syncCA.config.policy_status) {
              syncCA.config.policy_status = capitalizeFirstLetter(syncCA.config. policy_status)
              syncCA.config.policy_status_color = awsPolicyStatusColor(syncCA.config.policy_status)
            }

            cloudConnector.synchronized_cas[i] = syncCA
          }
        }


        currentList[cloudConnector.id] = cloudConnector
      })

      return { ...state, status: status.SUCCEEDED, cloudConnectorsList: currentList }

    case t.SYNCHRONIZE_CONNECTOR:
      return { ...state, status: status.PENDING, actionType: actionType.CREATE }

    case failed(t.SYNCHRONIZE_CONNECTOR):
      return { ...state, status: status.FAILED }

    case success(t.SYNCHRONIZE_CONNECTOR):
      return { ...state, status: status.SUCCEEDED }

    case t.FIRE_EVENT:
      return { ...state, status: status.PENDING, actionType: actionType.CREATE }

    case failed(t.FIRE_EVENT):
      return { ...state, status: status.FAILED }

    case success(t.FIRE_EVENT):
      return { ...state, status: status.SUCCEEDED }

    case t.UPDATE_ACCESS_POLICY:
      return { ...state, status: status.PENDING, actionType: actionType.UPDATE }

    case failed(t.UPDATE_ACCESS_POLICY):
      return { ...state, status: status.FAILED }

    case success(t.UPDATE_ACCESS_POLICY):
      return { ...state, status: status.SUCCEEDED }

    default:
      return state
  }
}

const getSelector = (state) => state.cloudproxy

export const isRequestInProgress = (state) => {
  const cloudProxyReducer = getSelector(state)
  return {
    status: cloudProxyReducer.status,
    actionType: cloudProxyReducer.actionType
  }
}

export const getCloudConnectors = (state) => {
  const cloudProxyReducer = getSelector(state)
  const cloudConnectorsKeys = Object.keys(cloudProxyReducer.cloudConnectorsList)
  const cloudConnectorsList = cloudConnectorsKeys.map(key => cloudProxyReducer.cloudConnectorsList[key])
  cloudConnectorsList.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  return cloudConnectorsList
}

export const getCloudConnectorById = (state, connectorId) => {
  const cloudProxyReducer = getSelector(state)
  console.log(cloudProxyReducer, connectorId);
  return cloudProxyReducer.cloudConnectorsList[connectorId]
}
