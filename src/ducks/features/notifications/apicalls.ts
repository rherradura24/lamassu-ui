import { apiRequest } from "ducks/services/api";

export const sendRequestToAZURE = async (payload: any) => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_CA_API + "/v1/pki"
    });
};
