import caList from "./mocks/ca-list.json";
import certsList from "./mocks/certs-list.json";

import keycloak from "keycloak";
export const getCAs = () => {
    return fetch(window._env_.REACT_APP_CA_API + "/v1/cas", {
        headers: {
            "Authorization": "Bearer " + keycloak.token
        }
    }).then(resp => {
        return resp.json()
    })
}

export const getCA = (caId) => {
    return new Promise((resolve, reject)=>{
        resolve(caId)
    })
}

export const revokeCA = (payload) => {
    console.log("REVOKING", payload);
    return new Promise((resolve, reject)=>{
        resolve(payload)
    })
}

export const createCA = (payload) => {
    console.log("CREATING", payload);
    return new Promise((resolve, reject)=>{
        resolve(payload)
    })
}

export const importCA = (payload) => {
    console.log("IMPORTING", payload);
    return new Promise((resolve, reject)=>{
        resolve(payload)
    })
}

export const getCerts = () => {
    return new Promise((resolve, reject)=>{
        resolve(certsList)
    })
}