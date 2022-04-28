import { createAsyncAction } from "typesafe-actions";
import { failed, success } from "ducks/actionTypes";
import { CloudConnector, CloudConnectorDeviceConfig } from "./models";

export const actionTypes = {
    GET_CONNECTORS: "GET_CONNECTORS",
    SYNCHRONIZE_CONNECTOR: "SYNCHRONIZE_CONNECTOR",
    FORCE_SYNCHRONIZE_CONNECTOR: "FORCE_SYNCHRONIZE_CONNECTOR",
    FIRE_CREATE_CA_EVENT: "FIRE_CREATE_CA_EVENT",
    UPDATE_ACCESS_POLICY: "UPDATE_ACCESS_POLICY",
    GET_DEVICE_CONFIG: "GET_DEVICE_CONFIG",
    UPDATE_DEVICE_CERTIFICATE_STATUS: "UPDATE_DEVICE_CERTIFICATE_STATUS"
};

export const getConnectorsAction = createAsyncAction(
    [actionTypes.GET_CONNECTORS, () => { }],
    [success(actionTypes.GET_CONNECTORS), (req: Array<CloudConnector>) => { return req; }],
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
    caName: string
    connectorID: string,
    caCetificate: string,
    caSerialnumber: string
}

export const forceSynchronizeCloudConnectorAction = createAsyncAction(
    [actionTypes.FORCE_SYNCHRONIZE_CONNECTOR, (req: ForceSynchronizeCloudConnector) => req],
    [failed(actionTypes.FORCE_SYNCHRONIZE_CONNECTOR), (req: any) => req],
    [failed(actionTypes.FORCE_SYNCHRONIZE_CONNECTOR), (req: Error) => req]

)();

export type FireCreateCAEvent = {
    caName: string
    selectedConnectors: Array<CloudConnector>,
    body: {
        ca_name: string,
        ca_certificate: string,
        ca_serial_number: string
    }
}

export const fireCreateCAEventAction = createAsyncAction(
    [actionTypes.FIRE_CREATE_CA_EVENT, (req: FireCreateCAEvent) => req],
    success(actionTypes.FIRE_CREATE_CA_EVENT),
    [failed(actionTypes.FIRE_CREATE_CA_EVENT), (req: Error) => req]
)();

export type UpdateAccessPolicy = {
    body: {
        connector_id: string,
        ca_name: string,
        policy: string
    }
}

export const updateAccessPolicyAction = createAsyncAction(
    [actionTypes.UPDATE_ACCESS_POLICY, (req: UpdateAccessPolicy) => req],
    success(actionTypes.UPDATE_ACCESS_POLICY),
    [failed(actionTypes.UPDATE_ACCESS_POLICY), (req: Error) => req]
)();

export type GetDevicesConfig = {
    connectorIDs: Array<string>,
    deviceID: string
}

export type GetDeviceConfigSucess = {
    device_config: CloudConnectorDeviceConfig
    connector_id: string
}

export const getCloudConnectorDeviceConfigAction = createAsyncAction(
    [actionTypes.GET_DEVICE_CONFIG, (req: GetDevicesConfig) => req],
    [success(actionTypes.GET_DEVICE_CONFIG), (req: Array<GetDeviceConfigSucess>) => { return req; }],
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
