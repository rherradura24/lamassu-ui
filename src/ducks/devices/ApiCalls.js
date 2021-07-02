import keycloak from "keycloak";
import devices from "./mocks/devices.json"

export const getAllDevices = async () => {
    
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
    /*return new Promise((resolve, reject) => {
        resolve({json: devices})
    })
    */
}

export const getDeviceById = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices/" + payload.id , {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}

export const getDeviceLogs = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices/" + payload.id + "/logs" , {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}

export const getDeviceCertHistory = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices/" + payload.id + "/cert-history" , {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}

export const getDeviceCert = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices/" + payload.id + "/cert" , {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}

export const getDeviceLastIssuedCert = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices/" + payload.id + "/logs" , {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}

export const createDevice = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
            body: JSON.stringify(payload)
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}

export const provisionDevice = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_API + "/v1/device", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
            body: JSON.stringify(payload)
        })
        if (resp.status == 200) {
            const crtPlusKey = resp.text()
            return {
                json: {data: crtPlusKey},
                status: resp.status
            }
        }else{
            const txt = resp.text()
            return {
                json: {error: txt},
                status: resp.status
            }
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}

export const revokeDeviceCert = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices/" + payload.id + "/revoke", {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}

export const deleteDevice = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices/" + payload.id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}