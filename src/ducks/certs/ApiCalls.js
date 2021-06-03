import caList from "./mocks/ca-list.json";
import certsList from "./mocks/certs-list.json";

import keycloak from "keycloak";
export const getCAs = async () => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/cas", {
            headers: {
                "Authorization": "Bearer " + keycloak.token
            }
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with API server" }
    }
}

export const getCA = (caId) => {
    return new Promise((resolve, reject) => {
        resolve(caId)
    })
}

export const revokeCA = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/cas/" + payload.caName, {
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
        return { error: "Connection error with API server" }
    }
}

export const createCA = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/cas/" + payload.caName, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + keycloak.token,
            },
            body: JSON.stringify(payload.crt)
        })
        const json = await resp.json()
        if (resp.status != 200) {
            if (json) {
                return { error: json.error }
            }
        }else{
            return {
                json: json,
                status: resp.status
            }
        }
    } catch (er) {
        return { error: "Connection error with API server" }
    }
}

export const importCA = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/cas/import/" + payload.caName, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.bundle)
        })
        const json = await resp.json()
        if (resp.status != 200) {
            if (json) {
                return { error: json.error }
            }
        }else{
            return {
                json: json,
                status: resp.status
            }
        }
    } catch (er) {
        console.log(er);
        return { error: "Connection error with API server" }
    }
}

export const getCerts = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/cas/issued" , {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            }
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        console.log(er);
        return { error: "Connection error with API server" }
    }
}

export const revokeCert = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/cas/" + payload.caName + "/cert/" + payload.serialNumber, {
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
        return { error: "Connection error with API server" }
    }
}