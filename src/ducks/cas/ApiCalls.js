import caList from "./mocks/ca-list.json";

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