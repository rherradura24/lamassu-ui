import { createAsyncAction } from "typesafe-actions";
import { failed, success } from "ducks/actionTypes";
import { Device, GetDeviceListAPIResponse, DevicesStats, DeviceManagerInfo } from "./models";

export const actionTypes = {
    GET_INFO_DEVICE_MANAGER_API: "GET_INFO_DEVICE_MANAGER_API",
    GET_STATS: "GET_STATS",
    GET_DEVICES: "GET_DEVICES",
    GET_DEVICE: "GET_DEVICE",
    REVOKE_ACTIVE_DEVICE_CERTIFICATE: "REVOKE_ACTIVE_DEVICE_CERTIFICATE",
    DECOMMISSION_DEVICE: "DECOMMISSION_DEVICE",
    REGISTER_DEVICE: "REGISTER_DEVICE"
};
export type GetStats = {
    force: boolean
}

export const getInfoAction = createAsyncAction(
    [actionTypes.GET_INFO_DEVICE_MANAGER_API, () => { }],
    [success(actionTypes.GET_INFO_DEVICE_MANAGER_API), (req: DeviceManagerInfo) => req],
    [failed(actionTypes.GET_INFO_DEVICE_MANAGER_API), (req: Error) => req]
)();

export const getStatsAction = createAsyncAction(
    [actionTypes.GET_STATS, (req: GetStats) => req],
    [success(actionTypes.GET_STATS), (req: DevicesStats) => { return req; }],
    [failed(actionTypes.GET_STATS), (req: Error) => req]
)();

export type GetDevicesAction = {
    sortMode: "asc" | "desc",
    sortField: string,
    limit: number,
    offset: number,
    filterQuery: Array<string>,
}

export const getDevicesAction = createAsyncAction(
    [actionTypes.GET_DEVICES, (req: GetDevicesAction) => req],
    [success(actionTypes.GET_DEVICES), (req: GetDeviceListAPIResponse) => { return req; }],
    [failed(actionTypes.GET_DEVICES), (req: Error) => req]
)();

export type GetDeviceByIDAction = {
    deviceID: string
}

export const getDeviceByIDAction = createAsyncAction(
    [actionTypes.GET_DEVICE, (req: GetDeviceByIDAction) => req],
    [success(actionTypes.GET_DEVICE), (req: Device, meta: any) => { return req; }, (req: Device, meta: any) => { return meta; }],
    [failed(actionTypes.GET_DEVICE), (req: Error) => req]
)();

export type DecommissionDeviceAction = {
    deviceID: string
}

export const decommissionDeviceAction = createAsyncAction(
    [actionTypes.DECOMMISSION_DEVICE, (req: DecommissionDeviceAction) => req],
    [success(actionTypes.DECOMMISSION_DEVICE), (req: any, meta: any) => { return req; }, (req: any, meta: any) => { return meta; }],
    [failed(actionTypes.DECOMMISSION_DEVICE), (req: Error) => req]
)();

export type RevokeActiveDeviceCertificate = {
    deviceID: string
}

export const revokeActiveDeviceCertificateAction = createAsyncAction(
    [actionTypes.REVOKE_ACTIVE_DEVICE_CERTIFICATE, (req: RevokeActiveDeviceCertificate) => req],
    [success(actionTypes.REVOKE_ACTIVE_DEVICE_CERTIFICATE), (req: any, meta: any) => { return req; }, (req: any, meta: any) => { return meta; }],
    [failed(actionTypes.REVOKE_ACTIVE_DEVICE_CERTIFICATE), (req: Error) => req]
)();

export type RegisterDevice = {
    deviceID: string,
    deviceAlias: string,
    deviceDescription: string,
    tags: Array<string>,
    color: string,
    icon: string,
    dmsName: string,
}

export const registerDeviceAction = createAsyncAction(
    [actionTypes.REGISTER_DEVICE, (req: RegisterDevice) => req],
    [success(actionTypes.REGISTER_DEVICE), (req: any) => { return req; }],
    [failed(actionTypes.REGISTER_DEVICE), (req: Error) => req]
)();
