import * as t from "./ActionTypes";

export const getAllDMS = () => ({
    type: t.GET_ALL_DMS,
})

export const createDms = (name, csr) => ({
    type: t.CREATE_DMS_REQUEST,
    payload: {
        csr: csr,
        dmsName: name
    }
})

export const updateDmsStatus = (id, csr) => ({
    type: t.UPDATE_DMS_STATUS,
})
  