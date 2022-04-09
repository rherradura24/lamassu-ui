import * as t from "./ActionTypes";

export const getCAs = () => ({
    type: t.GET_CAS,
})
  
export const getCA = (caId) => ({
    type: t.GET_CA,
    payload: { caId: caId },
})  


export const revokeCA = (caName) => ({
    type: t.REVOKE_CA,
    payload: { caName: caName },
})  

export const createCA = (certData) => ({
    type: t.CREATE_CA,
    payload: { 
        caName: certData.caName,
        body: {
            subject:{
                country: certData.country,
                state: certData.state,
                locality: certData.city,
                organization: certData.organization,
                organization_unit: certData.organizationUnit,
                common_name: certData.commonName,
            },
            key_metadata:{
                type: certData.keyType,
                bits: certData.keyBits,

            },
            ca_ttl: certData.caTtl,
            enroller_ttl: certData.enrollerTtl,
        }
    },
})  

export const importCA = (caName, bundle, ttl) => ({
    type: t.IMPORT_CA,
    payload: { 
        caName: caName,
        bundle:{
            pem_bundle: bundle,
            ttl: ttl
        }
    },
})  

export const bindAwsCAPolicy = (caName, serialNumber, policy) => ({
    type: t.BIND_AWS_CA_POLICY,
    payload: { 
        caName: caName,
        policy:policy,
        serialNumber: serialNumber
    },
})  

export const getCerts = (caType) => ({
    type: t.GET_CERTS,
    payload: { 
        caTypesToFetch: [caType]
    },
})  

export const getCert = (cerId) => ({
    type: t.GET_CERT,
    payload: { cerId: cerId },
})  

export const revokeCert = (serialNumber, caName) => ({
    type: t.REVOKE_CERT,
    payload: { caName: caName, serialNumber: serialNumber },
})  