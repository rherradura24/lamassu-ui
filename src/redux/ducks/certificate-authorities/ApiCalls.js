import { apiRequest } from "redux/utils";
import getCasMock from "./mocks/get-cas.json";
import getIssuedCertsMock from "./mocks/issued-certs.json";

export const getCAs = async () => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_CA_API + "/v1/pki"
    })
}

export const getIssuedCerts = async (caName) => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_CA_API + "/v1/pki/" + caName + "/issued"
    })
}

export const createCA = async (caName, bodyData) => {
    return apiRequest({
        method: "POST",
        url: window._env_.REACT_APP_LAMASSU_CA_API + "/v1/pki/" + caName ,
        data: bodyData
    })
}