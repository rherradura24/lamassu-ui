import { apiRequest } from "ducks/services/api";

export const getDevices = async (limit: number, offset: number, sortMode: "asc" | "desc", sortField: string, filterQuery: Array<string>): Promise<any> => {
    let url = window._env_.REACT_APP_LAMASSU_DEVMANAGER + "/v1/devices?" + `sort_by=${sortField}.${sortMode}&limit=${limit}&offset=${offset}`;
    if (filterQuery.length > 0) {
        filterQuery.forEach(filter => {
            url = url + `&filter=${filter}`;
        });
    }
    return apiRequest({
        method: "GET",
        url: url
    });
};

export const getStats = async (force: boolean): Promise<any> => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_DEVMANAGER + "/v1/stats?refresh=" + force
    });
};

export const getDeviceByID = async (deviceID: string): Promise<any> => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_DEVMANAGER + "/v1/devices/" + deviceID
    });
};

export const getDeviceCertHistory = async (deviceID: string): Promise<any> => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_DEVMANAGER + "/v1/devices/" + deviceID + "/cert-history"
    });
};

export const revokeActiveDeviceCertificate = async (deviceID: string): Promise<any> => {
    return apiRequest({
        method: "DELETE",
        url: window._env_.REACT_APP_LAMASSU_DEVMANAGER + "/v1/devices/" + deviceID + "/revoke"
    });
};

export const registerDevice = async (deviceID: string, alias: string, description: string, tags: Array<string>, iconName: string, iconColor: string, dmsID: string): Promise<any> => {
    return apiRequest({
        method: "POST",
        url: window._env_.REACT_APP_LAMASSU_DEVMANAGER + "/v1/devices",
        data: {
            id: deviceID,
            alias: alias,
            description: description,
            tags: tags,
            icon_name: iconName,
            icon_color: iconColor,
            dms_id: dmsID
        }
    });
};
