import { apiRequest } from "ducks/services/api";
import keycloak from "keycloak";

export const getCloudConnectors = async (): Promise<any> => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors"
    });
};

export const synchronizeCloudConnectors = async (connectorID: string, caName: string): Promise<any> => {
    return apiRequest({
        method: "POST",
        url: window._env_.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors/synchronize",
        data: {
            connector_id: connectorID,
            ca_name: caName
        }
    });
};

export const fireEvent = async (eventType: string, eventData: any): Promise<any> => {
    const now = new Date();
    const event = {
        specversion: "1.0",
        id: now,
        source: "lamassu-ui-" + keycloak.tokenParsed!.sub,
        type: eventType,
        datacontenttype: "datacontenttype",
        time: now,
        data: eventData
    };
    return apiRequest({
        method: "POST",
        url: window._env_.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors/synchronize",
        data: event
    });
};

export const updateAccessPolicy = async (connectorID: string, caName: string, newPolicy: any): Promise<any> => {
    return apiRequest({
        method: "PUT",
        url: window._env_.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors/" + connectorID + "/access-policy",
        data: {
            ca_name: caName,
            access_policy: newPolicy
        }
    });
};

export const getDeviceConfig = async (connectorID: string, deviceID: string): Promise<any> => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors/" + connectorID + "/devices/" + deviceID
    });
};

export const updateDeviceCertificateStatus = async (connectorID: string, deviceID: string, serialNumber: string, status: string): Promise<any> => {
    return apiRequest({
        method: "PUT",
        url: window._env_.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors/" + connectorID + "/devices/" + deviceID + "/cert",
        data: {
            status: status,
            serial_number: serialNumber
        }
    });
};
