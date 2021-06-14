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

export const provisionDevice = (id) => ({
    type: t.PROVISION_DEVICE,
    payload: {
        id: id
    }
})
export const deleteDevice = (id) => ({
    type: t.DELETE_DEVICE,
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
