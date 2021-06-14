import keycloak from "keycloak";

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
        return { error: "Connection error with Devices API server" }
    }
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
        return { error: "Connection error with Devices API server" }
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
        return { error: "Connection error with Devices API server" }
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
        return { error: "Connection error with Devices API server" }
    }
}

export const provisionDevice = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices/" + payload.id + "/issue", {
            method: "POST",
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
        return { error: "Connection error with Devices API server" }
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
        return { error: "Connection error with Devices API server" }
    }
}