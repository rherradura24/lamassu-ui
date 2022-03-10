import { apiRequest } from "redux/utils";

export const getCloudConnectors = async () => {

    return apiRequest({
        method: "GET",
        url: process.env.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors"
    })
}

export const synchronizeCloudConnectors = async (body) => {
    return apiRequest({
        method: "POST",
        url: process.env.REACT_APP_LAMASSU_CLOUD_PROXY_API + "/v1/connectors/synchronize",
        data: body
    })
}
