import { createAsyncAction } from "typesafe-actions";
import { failed, success } from "ducks/actionTypes";
import { Device, GetDeviceListAPIResponse, HistoricalCert } from "./models";

export const actionTypes = {
    GET_DEVICES: "GET_DEVICES",
    GET_DEVICE: "GET_DEVICE",
    GET_DEVICE_CERT_HISTORY: "GET_DEVICE_CERT_HISTORY",
    REVOKE_ACTIVE_DEVICE_CERTIFICATE: "REVOKE_ACTIVE_DEVICE_CERTIFICATE",
    REGISTER_DEVICE: "REGISTER_DEVICE"
};

export type GetDevicesAction = {
    sortMode: "asc" | "desc",
    sortField: string,
    offset: number,
    page: number
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

export type GetDeviceCertHistory = {
    deviceID: string
}

export const getDeviceCertHistoryAction = createAsyncAction(
    [actionTypes.GET_DEVICE_CERT_HISTORY, (req: GetDeviceCertHistory) => req],
    [success(actionTypes.GET_DEVICE_CERT_HISTORY), (req: Array<HistoricalCert>, meta: any) => { return req; }, (req: Array<HistoricalCert>, meta: any) => { return meta; }],
    [failed(actionTypes.GET_DEVICE_CERT_HISTORY), (req: Error) => req]
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
    dmsID: string,
}

export const registerDeviceAction = createAsyncAction(
    [actionTypes.REGISTER_DEVICE, (req: RegisterDevice) => req],
    [success(actionTypes.REGISTER_DEVICE), (req: any) => { return req; }],
    [failed(actionTypes.REGISTER_DEVICE), (req: Error) => req]
)();
