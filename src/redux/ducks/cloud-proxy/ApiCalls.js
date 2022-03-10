import { apiRequest } from "redux/utils";

export const getCloudConnectors = async () => {

    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors"
    })
}

export const synchronizeCloudConnectors = async (body) => {
    return apiRequest({
        method: "POST",
        url: window._env_.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors/synchronize",
        data: body
    })
}
