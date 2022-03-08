import * as t from "./ActionTypes";

export const getDmsList = () => ({
    type: t.GET_DMS_LIST,
})

export const createDMS = (dmsName, country, state, locality, organization, organizationUnit, commonName, keyType, keyBits) => ({
    type: t.CREATE_DMS,
    payload: { 
        dmsName: dmsName,
        body: {
            subject:{
                country: country,
                state: state,
                locality: locality,
                organization: organization,
                organization_unit: organizationUnit,
                common_name: commonName,
            },
            key_metadata:{
                type: keyType,
                bits: keyBits,

            },
        }
    },
})