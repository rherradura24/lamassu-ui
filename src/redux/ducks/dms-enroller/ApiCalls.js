import { apiRequest } from "redux/utils";

export const getDmsList = async () => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_DMS_ENROLLER_API + "/v1/"
    })
}

export const createDMS = async (dmsName, dmsBodyData) => {
    return apiRequest({
        method: "POST",
        url: window._env_.REACT_APP_LAMASSU_DMS_ENROLLER_API + "/v1/" + dmsName + "/form",
        data: dmsBodyData
    })
}
