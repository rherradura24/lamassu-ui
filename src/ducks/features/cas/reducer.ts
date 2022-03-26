/* eslint-disable prefer-const */
import { actionTypes } from "./actions";
import { Action } from "redux-actions";
import { failed, success } from "ducks/actionTypes";
import { Certificate, CertificateAuthority } from "./models";
import { ActionStatus, capitalizeFirstLetter, ORequestStatus, ORequestType } from "ducks/reducers_utils";
import { RootState } from "ducks/reducers";
import { keyStrengthToColor, statusToColor } from "./utils";

export interface CertificateAuthoritiesState {
    status: ActionStatus
    list: Array<CertificateAuthority>
    issuedCertsStatus: ActionStatus
}

const initialState = {
    status: {
        isLoading: false,
        status: ORequestStatus.Idle,
        type: ORequestType.None
    },
    issuedCertsStatus: {
        isLoading: false,
        status: ORequestStatus.Idle,
        type: ORequestType.None
    },
    list: []
};

export const certificateAuthoritiesReducer = (
    state: CertificateAuthoritiesState = initialState,
    action: Action<any>
): CertificateAuthoritiesState => {
    switch (action.type) {
    case actionTypes.GET_CAS: {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read }, list: [] };
    }

    case success(actionTypes.GET_CAS): {
        let list: Array<CertificateAuthority> = [];
        action.payload.forEach((ca: CertificateAuthority) => {
            ca.status = capitalizeFirstLetter(ca.status);
            ca.status_color = statusToColor(ca.status);

            ca.key_metadata.strength = capitalizeFirstLetter(ca.key_metadata.strength);
            ca.key_metadata.strength_color = keyStrengthToColor(ca.key_metadata.strength);

            ca.issued_certs = [];

            list.push(ca);
        });

        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success }, list: list };
    }

    case failed(actionTypes.GET_CAS): {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    }

    case actionTypes.GET_ISSUED_CERTS: {
        return { ...state, issuedCertsStatus: { isLoading: false, status: ORequestStatus.Pending, type: ORequestType.Read } };
    }

    case success(actionTypes.GET_ISSUED_CERTS): {
        let list: Array<Certificate> = [];
        console.log(action);

        action.payload.forEach((issuedCert: Certificate) => {
            issuedCert.key_metadata.strength = capitalizeFirstLetter(issuedCert.key_metadata.strength);
            issuedCert.key_metadata.strength_color = keyStrengthToColor(issuedCert.key_metadata.strength);

            issuedCert.status = capitalizeFirstLetter(issuedCert.status);
            issuedCert.status_color = statusToColor(issuedCert.status);

            list.push(issuedCert);
        });

        let cas = state.list;

        for (let i = 0; i < cas.length; i++) {
            // @ts-ignore
            if (cas[i].name === action.meta.caName) {
                cas[i].issued_certs = list;
            }
        }
        return { ...state, issuedCertsStatus: { ...state.issuedCertsStatus, isLoading: false, status: ORequestStatus.Failed }, list: cas };
    }

    default:
        return state;
    }
};

const getSelector = (state: RootState): CertificateAuthoritiesState => state.cas;

export const getCAs = (state: RootState): Array<CertificateAuthority> => {
    const caReducer = getSelector(state);
    return caReducer.list;
};

export const getCA = (state: RootState, caName: string): CertificateAuthority | undefined => {
    const caReducer = getSelector(state);
    const filteredCAs = caReducer.list.filter((ca: CertificateAuthority) => ca.name === caName);
    if (filteredCAs.length === 1) {
        return filteredCAs[0];
    }
    return undefined;
};

export const getRequestStatus = (state: RootState): ActionStatus => {
    const caReducer = getSelector(state);
    return caReducer.status;
};

export const getIssuedCertsRequestStatus = (state: RootState) => {
    const caReducer = getSelector(state);
    return caReducer.issuedCertsStatus;
};

export const getIssuedCerts = (state: RootState, caName: string) :Array<Certificate> | undefined => {
    const ca = getCA(state, caName);
    if (ca !== undefined) {
        return ca.issued_certs;
    }
    return undefined;
};
