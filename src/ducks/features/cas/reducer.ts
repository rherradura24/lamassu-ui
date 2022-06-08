/* eslint-disable prefer-const */
import { createReducer } from "typesafe-actions";
import { CAStats, Certificate, CertificateAuthority, OCAStatus } from "./models";
import { ActionStatus, capitalizeFirstLetter, ORequestStatus, ORequestType } from "ducks/reducers_utils";
import { RootState } from "ducks/reducers";
import { actions, RootAction } from "ducks/actions";
import { keyStrengthToColor, statusToColor } from "./utils";
import { GetIssuedCertsResponse } from "./actions";

export interface CertificateAuthoritiesState {
    status: ActionStatus
    caStats: CAStats
    list: Array<CertificateAuthority>
    issuedCertsStatus: ActionStatus
}

const initialState = {
    status: {
        isLoading: false,
        status: ORequestStatus.Idle,
        type: ORequestType.None
    },
    caStats: {
        issued_certs: 0,
        cas: 0,
        scan_date: new Date()
    },
    issuedCertsStatus: {
        isLoading: false,
        status: ORequestStatus.Idle,
        type: ORequestType.None
    },
    list: []
};

export const certificateAuthoritiesReducer = createReducer<CertificateAuthoritiesState, RootAction>(initialState)
    .handleAction(actions.caActions.getCAsAction.request, (state, action) => {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read }, list: [] };
    })
    .handleAction(actions.caActions.getStatsAction.success, (state, action) => {
        console.log(action.payload);

        return { ...state, caStats: action.payload };
    })

    .handleAction(actions.caActions.getCAsAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.caActions.getCAsAction.success, (state, action) => {
        let list: Array<CertificateAuthority> = [];
        action.payload.forEach((ca: CertificateAuthority) => {
            ca.status = capitalizeFirstLetter(ca.status);
            ca.status_color = statusToColor(ca.status);

            ca.key_metadata.strength = capitalizeFirstLetter(ca.key_metadata.strength);
            ca.key_metadata.strength_color = keyStrengthToColor(ca.key_metadata.strength);

            ca.issued_certs = [];
            ca.total_issued_certs = 0;

            list.push(ca);
        });

        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success }, list: list };
    })

    .handleAction(actions.caActions.getIssuedCertsActions.request, (state, action) => {
        return { ...state, issuedCertsStatus: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read } };
    })

    .handleAction(actions.caActions.getIssuedCertsActions.failure, (state, action) => {
        return { ...state, issuedCertsStatus: { ...state.issuedCertsStatus, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.caActions.getIssuedCertsActions.success, (state, action) => {
        let list: Array<Certificate> = [];
        const response: GetIssuedCertsResponse = action.payload as GetIssuedCertsResponse;
        const certs = response.certs ? response.certs : [];

        certs.forEach((issuedCert: Certificate) => {
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
                cas[i].total_issued_certs = response.total_certs;
            }
        }
        return { ...state, issuedCertsStatus: { ...state.issuedCertsStatus, isLoading: false, status: ORequestStatus.Success }, list: cas };
    })

    .handleAction(actions.caActions.createCAAction.request, (state, action) => {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Create } };
    })

    .handleAction(actions.caActions.createCAAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.caActions.createCAAction.success, (state, action) => {
        let currentList = state.list;

        let issuedCert = action.payload;
        issuedCert.key_metadata.strength = capitalizeFirstLetter(issuedCert.key_metadata.strength);
        issuedCert.key_metadata.strength_color = keyStrengthToColor(issuedCert.key_metadata.strength);

        issuedCert.status = capitalizeFirstLetter(issuedCert.status);
        issuedCert.status_color = statusToColor(issuedCert.status);

        issuedCert.issued_certs = [];
        issuedCert.total_issued_certs = 0;

        currentList.push(issuedCert);
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success }, list: currentList };
    })

    .handleAction(actions.caActions.importCAAction.request, (state, action) => {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Create } };
    })

    .handleAction(actions.caActions.importCAAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.caActions.importCAAction.success, (state, action) => {
        let currentList = state.list;

        let issuedCert = action.payload;
        issuedCert.key_metadata.strength = capitalizeFirstLetter(issuedCert.key_metadata.strength);
        issuedCert.key_metadata.strength_color = keyStrengthToColor(issuedCert.key_metadata.strength);

        issuedCert.status = capitalizeFirstLetter(issuedCert.status);
        issuedCert.status_color = statusToColor(issuedCert.status);

        issuedCert.issued_certs = [];
        issuedCert.total_issued_certs = 0;

        currentList.push(issuedCert);
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success }, list: currentList };
    })

    .handleAction(actions.caActions.revokeCAAction.request, (state, action) => {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Delete } };
    })

    .handleAction(actions.caActions.revokeCAAction.success, (state, action) => {
        console.log(action);
        let currentList: Array<CertificateAuthority> = state.list;
        let index = currentList.map(ca => ca.name).indexOf(action.meta.caName);
        if (index >= 0) {
            currentList[index].status = OCAStatus.Revoked;
            currentList[index].status_color = statusToColor(currentList[index].status);
        }

        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success }, list: currentList };
    })

    .handleAction(actions.caActions.revokeCAAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.caActions.revokeCertAction.request, (state, action) => {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Delete } };
    })

    .handleAction(actions.caActions.revokeCertAction.success, (state, action) => {
        console.log(action);
        let currentList: Array<CertificateAuthority> = state.list;
        let index = currentList.map(ca => ca.name).indexOf(action.meta.caName);
        if (index >= 0) {
            const certIdx = currentList[index].issued_certs.map((cert: Certificate) => cert.serial_number).indexOf(action.meta.serialNumber);
            if (certIdx >= 0) {
                currentList[index].issued_certs[certIdx].status = statusToColor(OCAStatus.Revoked);
                currentList[index].issued_certs[certIdx].status = statusToColor(currentList[index].issued_certs[certIdx].status);
            }
        }

        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success }, list: currentList };
    })

    .handleAction(actions.caActions.revokeCertAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    });

const getSelector = (state: RootState): CertificateAuthoritiesState => state.cas;

export const getStats = (state: RootState): CAStats => {
    const caReducer = getSelector(state);
    return caReducer.caStats;
};

export const getCAs = (state: RootState): Array<CertificateAuthority> => {
    const caReducer = getSelector(state);
    return caReducer.list.sort((a: CertificateAuthority, b: CertificateAuthority) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
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

export const getIssuedCerts = (state: RootState, caName: string): Array<Certificate> | undefined => {
    const ca = getCA(state, caName);
    if (ca !== undefined) {
        return ca.issued_certs;
    }
    return undefined;
};
export const getTotalIssuedCerts = (state: RootState, caName: string): number | undefined => {
    const ca = getCA(state, caName);
    if (ca !== undefined) {
        return ca.total_issued_certs;
    }
    return undefined;
};
