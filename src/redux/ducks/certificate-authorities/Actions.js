import * as t from "./ActionTypes";

export const getCAs = () => ({
    type: t.GET_CAS,
})

export const getIssuedCerts = (caName) => ({
    type: t.GET_ISSUED_CERTS,
    payload: {
        caName: caName
    }
})