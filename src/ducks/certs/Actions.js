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
        caName: certData.caName,
        crt: {
            country: certData.country,
            state: certData.state,
            locality: certData.city,
            organization: certData.organization,
            organization_unit: certData.organizationUnit,
            common_name: certData.commonName,
            key_type: certData.keyType,
            key_bits: certData.keyBits,
            validFrom: certData.validFrom,
            validTo: certData.validTo,
        }
    },
})  

export const importCA = (caName, bundle) => ({
    type: t.IMPORT_CA,
    payload: { 
        caName: caName,
        bundle:{
            pem_bundle: bundle 
        }
    },
})  