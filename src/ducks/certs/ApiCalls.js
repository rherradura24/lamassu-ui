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

export const revokeCA = (payload) => {
    console.log("REVOKING", payload);
    return new Promise((resolve, reject) => {
        resolve(payload)
    })
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
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with API server" }
    }
}

export const importCA = async (payload) => {
    console.log(payload);
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
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        console.log(er);
        return { error: "Connection error with API server" }
    }
}

export const getCerts = () => {
    return new Promise((resolve, reject) => {
        resolve(certsList)
    })
}