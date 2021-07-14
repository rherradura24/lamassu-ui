import * as t from "./ActionTypes";

export const getAllDMS = () => ({
    type: t.GET_ALL_DMS_ENROLLER,
})

export const createDmsViaCsr = (name, csr) => ({
    type: t.CREATE_DMS_ENROLLER_REQUEST_VIA_CSR_REQUEST,
    payload: {
        csr: csr,
        dmsName: name
    }
})

export const createDmsViaForm = (name, csrForm) => ({
    type: t.CREATE_DMS_ENROLLER_REQUEST_VIA_FORM_REQUEST,
    payload: {
        csrForm: {
            "key_bits": csrForm.keyBits,
            "key_type": csrForm.keyType,
            "common_name": csrForm.commonName,
            "country": csrForm.country,
            "state": csrForm.state,
            "locality": csrForm.locality,
            "organization": csrForm.organization,
            "organization_unit": csrForm.organizationUnit
        },
        dmsName: name
    }
})

export const updateDmsStatus = (id, dms, status) => {
    dms.status = status
    return {
        type: t.UPDATE_DMS_ENROLLER_STATUS,
        payload: {
            id: id,
            dms: dms,
        }
    }
}

export const getDmsCert = (id) => {
    return {
        type: t.GET_DMS_ENROLLER_CERT,
        payload: {
            id: id,
        }
    }
}

export const deletePrivKeyStorage = () => {
    return {
        type: t.DELETE_LAST_PRIV_KEY,
    }
}
  

export const getDmsLastIssuedCert = () => {
    return {
        type: t.GET_DMS_LAST_ISSUED_CERT,
    }
}
  