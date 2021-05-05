import * as t from "./ActionTypes";

export const getCAs = () => ({
    type: t.GET_CAS,
})
  
export const getCA = (caId) => ({
    type: t.GET_CA,
    payload: { caId: caId },
})  

export const getCerts = () => ({
    type: t.GET_CERTS,
})  

export const getCert = (cerId) => ({
    type: t.GET_CERT,
    payload: { cerId: cerId },
})  

export const revokeCert = (cerId) => ({
    type: t.REVOKE_CERT,
    payload: { cerId: cerId },
})  

export const createCA = (certData) => ({
    type: t.CREATE_CA,
    payload: { 
        country: certData.country,
        state: certData.state,
        city: certData.city,
        organization: certData.organization,
        organizationUnit: certData.organizationUnit,
        commonName: certData.commonName,
        validFrom: certData.validFrom,
        validTo: certData.validTo,
    },
})  

export const importCA = (cert) => ({
    type: t.IMPORT_CA,
    payload: { cert: cert },
})  