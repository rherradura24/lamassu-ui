import { success, failed } from "redux/utils";
import { actionType, status } from "redux/utils/constants";
import * as t from "./ActionTypes"
import { cloudConnectorStatusToColor } from "./utils";

function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const initState = {
    status: status.IDLE,
    actionType: actionType.NONE,
    cloudConnectorsList: {},
}

export const reducer = (state = initState, action) => {
    // console.log(action, state);
    switch (action.type) {
        case t.GET_CLOUD_CONNECTORS:
            return { ...state, status: status.PENDING, actionType: actionType.READ };

        case failed(t.GET_CLOUD_CONNECTORS):
            return { ...state, status: status.FAILED};

        case success(t.GET_CLOUD_CONNECTORS):
            var currentList = {}

            action.payload.forEach(cloudConnector => {
                // Standarize Strings
                cloudConnector.status = capitalizeFirstLetter(cloudConnector.status)
                cloudConnector.status_color = cloudConnectorStatusToColor(cloudConnector.status)
                
                cloudConnector.synchronized_cas = {
                    status: status.IDLE,
                    list: {}
                }
                
                currentList[cloudConnector.id] = cloudConnector
            });

            return { ...state, status: status.SUCCEEDED, cloudConnectorsList: currentList };

        case t.SYNCHRONIZE_CONNECTOR:
            return { ...state, status: status.PENDING, actionType: actionType.CREATE };

        case failed(t.SYNCHRONIZE_CONNECTOR):
            return { ...state, status: status.FAILED};

        case success(t.SYNCHRONIZE_CONNECTOR):
            return { ...state, status: status.SUCCEEDED };

        case t.GET_SYNCHRONIZED_CAS_BY_CONNECTOR:
            return {
                ...state,
                cloudConnectorsList: {
                    ...state.cloudConnectorsList,
                    [action.payload.connectorId]: {
                        ...state.cloudConnectorsList[action.payload.connectorId],
                        synchronized_cas: {
                            ...state.cloudConnectorsList[action.payload.connectorId].synchronized_cas,
                            status: status.PENDING,
                            actionType: actionType.READ
                        }
                    },
                }
            };

        case failed(t.GET_SYNCHRONIZED_CAS_BY_CONNECTOR):
            return {
                ...state,
                cloudConnectorsList: {
                    ...state.cloudConnectorsList,
                    [action.meta.connectorId]: {
                        ...state.cloudConnectorsList[action.meta.connectorId],
                        synchronized_cas: {
                            ...state.cloudConnectorsList[action.meta.connectorId].synchronized_cas,
                            status: status.FAILED
                        }
                    },
                }
            };

        case success(t.GET_SYNCHRONIZED_CAS_BY_CONNECTOR):
            var currentList = {}

            action.payload.forEach(syncCA => {                
                currentList[syncCA.ca_name] = {
                    name: syncCA.ca_name,
                    enabled_ts: syncCA.enabled
                }
            });
            return {
                ...state,
                cloudConnectorsList: {
                    ...state.cloudConnectorsList,
                    [action.meta.connectorId]: {
                        ...state.cloudConnectorsList[action.meta.connectorId],
                        synchronized_cas: {
                            ...state.cloudConnectorsList[action.meta.connectorId].synchronized_cas,
                            list: currentList,
                            status: status.SUCCEEDED,
                        }
                    },
                }
            };

        default:
            return state;
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
    return cloudConnectorsList;
}