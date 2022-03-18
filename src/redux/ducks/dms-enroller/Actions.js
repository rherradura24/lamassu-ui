import * as t from "./ActionTypes";

export const resetCurretRequestStatus = () => ({
    type: t.RESET_CURRENT_REQUEST_STATUS,
})

export const getDmsList = () => ({
    type: t.GET_DMS_LIST,
})

export const createDMS = (dmsName, country, state, locality, organization, organizationUnit, commonName, keyType, keyBits) => ({
    type: t.CREATE_DMS,
    payload: { 
        dmsName: dmsName,
        body: {
            subject:{
                country: country,
                state: state,
                locality: locality,
                organization: organization,
                organization_unit: organizationUnit,
                common_name: commonName,
            },
            key_metadata:{
                type: keyType,
                bits: keyBits,
                
            },
        }
    },
})

export const approveDmsRequest = (dmsId, caNameList) => ({
    type: t.APPROVE_DMS_REQUEST,
    payload: {
        dmsId: dmsId,
        body: {
            status: "APPROVED",
            authorized_cas: caNameList
        }
    }
})

export const declineDmsRequest = (dmsId) => ({
    type: t.DECLINE_DMS_REQUEST,
    payload: {
        dmsId: dmsId,
        body: {
            status: "DENIED",
        }
    }
})
export const revokeDmsRequest = (dmsId) => ({
    type: t.APPROVE_DMS_REQUEST,
    payload: {
        dmsId: dmsId,
        body: {
            status: "REVOKED",
        }
    }
})