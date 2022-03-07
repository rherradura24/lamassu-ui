import { success, failed } from "redux/utils";
import { actionType, status } from "redux/utils/constants";
import * as t from "./ActionTypes"
import { keyStrengthToColor, statusToColor } from "./utils";

function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}  

const initState = {
    status: status.IDLE,
    actionType: actionType.NONE,
    list: {}
}

export const reducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case t.GET_CAS:
            return {...state, status: status.PENDING, actionType: actionType.READ };

        case success(t.GET_CAS):
            var currentList = {}

            action.payload.forEach(ca => {
                // Standarize Strings
                ca.status = capitalizeFirstLetter(ca.status)
                ca.key_metadata.strength = capitalizeFirstLetter(ca.key_metadata.strength)

                ca.status_color = statusToColor(ca.status)
                ca.key_metadata.strength_color = keyStrengthToColor(ca.key_metadata.strength)

                ca.issued_certs = {
                    status: status.IDLE,
                    list: {}
                }
                currentList[ca.name] = ca
            });

            return {...state, list: currentList, status: status.SUCCEEDED };

        case failed(t.GET_CAS):
            return {...state, status: status.FAILED };

        case t.GET_ISSUED_CERTS:
            return {
                ...state, 
                list: {
                    ...state.list,
                    [action.payload.caName]:{
                        ...state.list[action.payload.caName],
                        issued_certs: {
                            ...state.list[action.payload.caName].issued_certs,
                            status: status.PENDING,
                            actionType: actionType.READ
                        }
                    },
                }
        };

        case success(t.GET_ISSUED_CERTS):
            var currentList = state.list

            action.payload.forEach(issuedCert => {
                issuedCert.key_metadata.strength = capitalizeFirstLetter(issuedCert.key_metadata.strength)
                issuedCert.key_metadata.strength_color = keyStrengthToColor(issuedCert.key_metadata.strength)

                issuedCert.status = capitalizeFirstLetter(issuedCert.status)
                issuedCert.status_color = statusToColor(issuedCert.status)

                currentList[action.meta.caName].issued_certs.list[issuedCert.serial_number] = issuedCert
            });

            currentList[action.meta.caName].issued_certs = {
                ...currentList[action.meta.caName].issued_certs,
                status: status.SUCCEEDED
            }

            return {...state, list: currentList };

        case failed(t.GET_ISSUED_CERTS):

            return {
                ...state, 
                list: {
                    ...state.list,
                    [action.meta.caName]:{
                        ...state.list[action.meta.caName],
                        issued_certs: {
                            ...state.list[action.meta.caName].issued_certs,
                            status: status.FAILED
                        }
                    },
                }
        };

        case t.CREATE_CA:
            return {...state, status: status.PENDING, actionType: actionType.CREATE };

        case failed(t.CREATE_CA):
            return {...state, status: status.FAILED };

        case success(t.CREATE_CA):
            return {...state, status: status.SUCCEEDED };

        default:
            return state;
    }
}

const getSelector = (state) => state.cas

export const isRequestInProgress = (state) => {
    const caReducer = getSelector(state)
    return {
        status: caReducer.status,
        actionType: caReducer.actionType
    }
}

export const getCAs = (state) => {
    const caReducer = getSelector(state)
    const certsKeys = Object.keys(caReducer.list)
    const certList = certsKeys.map(key => caReducer.list[key])
    certList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    return certList;
}
export const getCA = (state, caName) => {
    const caReducer = getSelector(state)
    return caReducer.list[caName];
}

export const isIssuedCertsRequestInProgress = (state, caName) => {
    const caReducer = getSelector(state).list[caName]
    return {
        status: caReducer.issued_certs.status,
        actionType: caReducer.issued_certs.actionType
    }
}

export const getIssuedCerts = (state, caName) => {
    const caReducer = getSelector(state).list[caName]
    const certsKeys = Object.keys(caReducer.issued_certs.list)
    const certList = certsKeys.map(key => caReducer.issued_certs.list[key])
    const sortedCertList = certList.sort((a,b) => (a.serial_number > b.serial_number) ? 1 : ((b.serial_number > a.serial_number) ? -1 : 0))
    return sortedCertList
}