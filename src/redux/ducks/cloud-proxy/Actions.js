import * as t from "./ActionTypes";
import keycloak from "keycloak";


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

export const forceSynchronizeCloudConnector = (cloudConnectorId, caName, caCert, caSerialNumber) => ({
    type: t.FORCE_SYNCHRONIZE_CONNECTOR,
    payload: {
        connector_id: cloudConnectorId,
        ca_name: caName,
        ca_certificate: caCert,
        ca_serial_number: caSerialNumber
    }
})

export const fireEvent = (eventType, eventData) => {
    const now = new Date()

    const event = {
        specversion: "1.0",
        id: now,
        source: "lamassu-ui-" + keycloak.tokenParsed.sub,
        type: eventType,
        datacontenttype: "datacontenttype",
        time: now,
        data: eventData
    }

    return {
        type: t.FIRE_EVENT,
        payload: {
            body: event
        }
    }
}

export const updateAccessPolicy = (connectorId, caName, newPolicy) => {
    return {
        type: t.UPDATE_ACCESS_POLICY,
        payload: {
            connector_id: connectorId,
            body: {
                ca_name: caName, 
                access_policy: newPolicy
            }
        }
    }
}
