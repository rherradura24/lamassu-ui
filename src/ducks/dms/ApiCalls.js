import dmsList from "./mocks/dms-list.json"

export const getAllDms = () => {
    return new Promise((resolve, reject)=>{
        resolve(dmsList)
    })
}