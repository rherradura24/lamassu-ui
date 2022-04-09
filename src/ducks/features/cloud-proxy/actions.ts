import { createAsyncAction } from "typesafe-actions";
import { failed, success } from "ducks/actionTypes";
import { AWSDeviceConfig, CloudConnector } from "./models";

export const actionTypes = {
    GET_CONNECTORS: "GET_CONNECTORS",
    SYNCHRONIZE_CONNECTOR: "SYNCHRONIZE_CONNECTOR",
    FORCE_SYNCHRONIZE_CONNECTOR: "FORCE_SYNCHRONIZE_CONNECTOR",
    FIRE_CREATE_CA_EVENT: "FIRE_CREATE_CA_EVENT",
    UPDATE_ACCESS_POLICY: "UPDATE_ACCESS_POLICY",
    GET_DEVICES_CONFIG: "GET_DEVICES_CONFIG"
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
    connectorIDs: Array<string>
}

export type GetDevicesConfigSucess = {
    devices_config: Array<AWSDeviceConfig>
    connector_id: string
}

export const getCloudConnectorDevicesConfigAction = createAsyncAction(
    [actionTypes.GET_DEVICES_CONFIG, (req: GetDevicesConfig) => req],
    [success(actionTypes.GET_DEVICES_CONFIG), (req: Array<GetDevicesConfigSucess>, meta: any) => { return req; }, (req: Array<GetDevicesConfigSucess>, meta: any) => { return meta; }],
    [failed(actionTypes.GET_DEVICES_CONFIG), (req: Error) => req]
)();
