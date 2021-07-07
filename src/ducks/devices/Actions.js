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
export const provisionDevice = (deviceId, caName, dmsProvisionUrl) => ({
    type: t.PROVISION_DEVICE,
    payload: {
        device_id: deviceId,
        ca_name: caName,
        dms_provision_url: dmsProvisionUrl
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
