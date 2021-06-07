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

export const updateDmsStatus = (id, dms, status) => {
    dms.status = status
    return {
        type: t.UPDATE_DMS_STATUS,
        payload: {
            id: id,
            dms: dms,
        }
    }
}
  