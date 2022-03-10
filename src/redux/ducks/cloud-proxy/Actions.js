import * as t from "./ActionTypes";

export const getCloudConnectors = () => ({
    type: t.GET_CLOUD_CONNECTORS,
})

export const getSynchronizeCAsByCloudConnector = (cloudConnectorId) => ({
    type: t.GET_SYNCHRONIZED_CAS_BY_CONNECTOR,
    payload: {
        connectorId: cloudConnectorId
    }
})

export const synchronizeCloudConnector = (cloudConnectorId, caName) => ({
    type: t.SYNCHRONIZE_CONNECTOR,
    payload: {
        body: {
            connector_id: cloudConnectorId,
            ca_name: caName,
        }
    }
})
