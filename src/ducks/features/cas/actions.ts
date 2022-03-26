import { createAction } from "redux-actions";

export const actionTypes = {
    GET_CAS: "GET_CAS",
    GET_ISSUED_CERTS: "GET_ISSUED_CERTS"
};

export interface IGetCAs {}
export const getCAsAction = createAction<IGetCAs>(actionTypes.GET_CAS);

export interface IGetIssuedCerts {
    caName: string
}
export const getIssuedCertsActions = createAction<IGetIssuedCerts>(actionTypes.GET_ISSUED_CERTS);
