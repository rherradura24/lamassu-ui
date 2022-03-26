import { apiRequest } from "ducks/services/api";

export const getCAs = async () => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_CA_API + "/v1/pki"
    });
};
export const getIssuedCerts = async (caName: string) => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_CA_API + "/v1/pki/" + caName + "/issued"
    });
};
