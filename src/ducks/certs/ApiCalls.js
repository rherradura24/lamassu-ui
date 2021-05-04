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

export const getCerts = () => {
    return new Promise((resolve, reject)=>{
        resolve(certsList)
    })
}