import { apiRequest } from "ducks/services/api";
import { CreateDMSForm } from "./actions";
import { DMSStatus } from "./models";

export const getDMSList = async (): Promise<any> => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_DMS_ENROLLER_API + "/v1/"
    });
};

export const createDMS = async (dmsName: string, dmsForm: CreateDMSForm): Promise<any> => {
    return apiRequest({
        method: "POST",
        url: window._env_.REACT_APP_LAMASSU_DMS_ENROLLER_API + "/v1/" + dmsName + "/form",
        data: dmsForm
    });
};

export const updateDMS = async (dmsID: string, status: DMSStatus, authorizedCAs?: Array<string>): Promise<any> => {
    // eslint-disable-next-line prefer-const
    let payload: any = {
        status: status
    };

    if (authorizedCAs) {
        payload.authorized_cas = authorizedCAs;
    }
    return apiRequest({
        method: "PUT",
        url: window._env_.REACT_APP_LAMASSU_DMS_ENROLLER_API + "/v1/" + dmsID,
        data: payload
    });
};
