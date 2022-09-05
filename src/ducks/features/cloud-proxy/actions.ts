import { createAsyncAction } from "typesafe-actions";
import { failed, success } from "ducks/actionTypes";
import { CloudConnector, CloudConnectorDeviceConfig, CloudProxyInfo } from "./models";

export const actionTypes = {
    GET_INFO_CLOUD_PROXY_API: "GET_INFO_CLOUD_PROXY_API",
    GET_CONNECTORS: "GET_CONNECTORS",
    SYNCHRONIZE_CONNECTOR: "SYNCHRONIZE_CONNECTOR",
    FORCE_SYNCHRONIZE_CONNECTOR: "FORCE_SYNCHRONIZE_CONNECTOR",
    UPDATE_CONFIGURATION: "UPDATE_CONFIGURATION",
    GET_DEVICE_CONFIG: "GET_DEVICE_CONFIG",
    UPDATE_DEVICE_CERTIFICATE_STATUS: "UPDATE_DEVICE_CERTIFICATE_STATUS"
};

export const getInfoAction = createAsyncAction(
    [actionTypes.GET_INFO_CLOUD_PROXY_API, () => { }],
    [success(actionTypes.GET_INFO_CLOUD_PROXY_API), (req: CloudProxyInfo) => req],
    [failed(actionTypes.GET_INFO_CLOUD_PROXY_API), (req: Error) => req]
)();

interface GetConnectorsResponse {
    cloud_connectors: Array<CloudConnector>
}
export const getConnectorsAction = createAsyncAction(
    [actionTypes.GET_CONNECTORS, () => { }],
    [success(actionTypes.GET_CONNECTORS), (req: GetConnectorsResponse) => { return req; }],
    [failed(actionTypes.GET_CONNECTORS), (req: Error) => req]
)();

export type SynchronizeCloudConnector = {
    caName: string
    selectedConnectors: Array<CloudConnector>,
    body: {
        connector_id: string,
        ca_name: string
    }
}

export const synchronizeCloudConnectorAction = createAsyncAction(
    [actionTypes.SYNCHRONIZE_CONNECTOR, (req: SynchronizeCloudConnector) => req],
    success(actionTypes.SYNCHRONIZE_CONNECTOR),
    [failed(actionTypes.SYNCHRONIZE_CONNECTOR), (req: Error) => req]
)();

export type ForceSynchronizeCloudConnector = {
    eventType: string,
    connectorID: string,
    eventPayload :{
        name: string,
        status: string,
        certificate: string,
        serial_number: string,
        key_metadata: {
            type: string,
            bits: number,
            strength: string,
        },
        subject: {
            common_name: string,
            organization: string,
            organization_unit: string,
            country: string,
            state: string,
            locality: string,
        },
        valid_from: number,
        valid_to: number,
        issuance_duration: number
    }
}

export const forceSynchronizeCloudConnectorAction = createAsyncAction(
    [actionTypes.FORCE_SYNCHRONIZE_CONNECTOR, (req: ForceSynchronizeCloudConnector) => req],
    [failed(actionTypes.FORCE_SYNCHRONIZE_CONNECTOR), (req: any) => req],
    [failed(actionTypes.FORCE_SYNCHRONIZE_CONNECTOR), (req: Error) => req]

)();

export type UpdateConfigurationRequest = {
    connector_id: string,
    configuration: any
}

export const updateConfiguration = createAsyncAction(
    [actionTypes.UPDATE_CONFIGURATION, (req: UpdateConfigurationRequest) => req],
    success(actionTypes.UPDATE_CONFIGURATION),
    [failed(actionTypes.UPDATE_CONFIGURATION), (req: Error) => req]
)();

export type GetDevicesConfig = {
    connectorIDs: Array<string>,
    deviceID: string
}

export type GetDeviceConfigSuccess = {
    device_config: CloudConnectorDeviceConfig
    connector_id: string
}

export const getCloudConnectorDeviceConfigAction = createAsyncAction(
    [actionTypes.GET_DEVICE_CONFIG, (req: GetDevicesConfig) => req],
    [success(actionTypes.GET_DEVICE_CONFIG), (req: Array<GetDeviceConfigSuccess>, meta: any) => req, (req: Array<GetDeviceConfigSuccess>, meta: any) => meta],
    [failed(actionTypes.GET_DEVICE_CONFIG), (req: Error) => req]
)();

export type UpdateDeviceCertificateStatus = {
    connectorID: string,
    deviceID: string,
    caName: string,
    serialNumber: string,
    status: string
}

export const updateDeviceCertificateStatusAction = createAsyncAction(
    [actionTypes.UPDATE_DEVICE_CERTIFICATE_STATUS, (req: UpdateDeviceCertificateStatus) => req],
    [success(actionTypes.UPDATE_DEVICE_CERTIFICATE_STATUS), (req: any, meta: any) => req, (req: any, meta: any) => meta],
    [failed(actionTypes.UPDATE_DEVICE_CERTIFICATE_STATUS), (req: Error) => req]
)();
