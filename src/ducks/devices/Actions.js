import * as t from "./ActionTypes";

export const getAllDevices = () => ({
    type: t.GET_ALL_DEVICES,
})

export const getDeviceById = (id) => ({
    type: t.GET_DEVICE,
    payload: {
        id: id
    }
})
export const getDeviceByLogs = (id) => ({
    type: t.GET_DEVICE_LOGS,
    payload: {
        id: id
    }
})
export const getIssuedCertsByDmsLastThirtyDays = () => ({
    type: t.GET_DMS_CERT_HISTORY_LAST_30_DAYS,
})
/*
export const provisionDevice = (deviceData) => ({
    type: t.PROVISION_DEVICE,
    payload: {
        device_id: deviceData.device_id,
        ca_name: deviceData.ca_name,
        //dmsId: deviceData.id,
        c: deviceData.country,
        string: deviceData.state,
        l: deviceData.city,
        o: deviceData.organization,
        ou: deviceData.organization_unit,
        cn: deviceData.common_name,
        keyAlg: deviceData.key_type,
        keySize: deviceData.key_bits,
        email: ""
}
})
*/
export const provisionDevice = (deviceId, caName, dmsProvisionUrl, deviceCertInfo) => ({
    type: t.PROVISION_DEVICE,
    payload: {
        device_id: deviceId,
        ca_name: caName,
        dms_provision_url: dmsProvisionUrl,
        device_cert_info:{
            c: deviceCertInfo.country,
            st: deviceCertInfo.state,
            l: deviceCertInfo.locality,
            o: deviceCertInfo.organization,
            ou: deviceCertInfo.organization_unit,
            key_bits: deviceCertInfo.key_bits,
            key_type: deviceCertInfo.key_type,
        }
    }
})
export const provisionDeviceCsr = (deviceId, caName, dmsProvisionUrl, csr) => ({
    type: t.PROVISION_DEVICE_CSR,
    payload: {
        device_id: deviceId,
        ca_name: caName,
        dms_provision_url: dmsProvisionUrl,
        csr: csr
    }
})
export const renewDevice = (deviceId, dmsRenewUrl) => ({
    type: t.RENEW_DEVICE,
    payload: {
        device_id: deviceId,
        dms_renew_url: dmsRenewUrl
    }
})

export const deleteDevice = (id) => ({
    type: t.DELETE_DEVICE,
    payload: {
        id: id
    }
})
export const revokeDeviceCert = (id) => ({
    type: t.REVOKE_DEVICE_CERT,
    payload: {
        id: id
    }
})

export const createDevice = (deviceJson) => {
    console.log(deviceJson);
    return {
        type: t.CREATE_DEVICE,
        payload: {
            id: deviceJson.uuid,
            alias: deviceJson.alias,
            country: deviceJson.country,
            state: deviceJson.state,
            locality: deviceJson.locality,
            organization: deviceJson.org,
            organization_unit: deviceJson.orgUnit,
            common_name: deviceJson.commonName,
            dms_id: deviceJson.dmsId,
            key_type: deviceJson.keyType,
            key_bits: deviceJson.keyBits,
        }
    }
}
