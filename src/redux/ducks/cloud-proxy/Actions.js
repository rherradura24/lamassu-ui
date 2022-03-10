import * as t from "./ActionTypes";

export const getCloudConnectors = () => ({
    type: t.GET_CLOUD_CONNECTORS,
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
