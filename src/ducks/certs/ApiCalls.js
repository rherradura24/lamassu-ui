import caList from "./mocks/ca-list.json";
import certsList from "./mocks/certs-list.json";

export const getCAs = () => {
    return new Promise((resolve, reject)=>{
        resolve(caList)
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