import { createAsyncAction } from "typesafe-actions";
import { failed, success } from "ducks/actionTypes";
import { GetDeviceLogsResponse } from "./models";

export const actionTypes = {
    GET_DEVICE_LOGS: "GET_DEVICE_LOGS"
};

export type GetDeviceLogs = {
    // sortMode: "asc" | "desc",
    // sortField: string,
    // limit: number,
    // offset: number,
    // filterQuery: Array<string>,
    deviceID: string
}

export const getDeviceLogs = createAsyncAction(
    [actionTypes.GET_DEVICE_LOGS, (req: GetDeviceLogs) => req],
    [success(actionTypes.GET_DEVICE_LOGS), (req: GetDeviceLogsResponse, meta: GetDeviceLogs) => { return req; }, (req: GetDeviceLogsResponse, meta: GetDeviceLogs) => { return meta; }],
    [failed(actionTypes.GET_DEVICE_LOGS), (req: Error) => req]
)();
