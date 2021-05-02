import * as t from "./ActionTypes";

export const getCAs = () => ({
    type: t.GET_CAS,
})
  
export const getCA = (caId) => ({
    type: t.GET_CA,
    payload: { caId: caId },
})  
