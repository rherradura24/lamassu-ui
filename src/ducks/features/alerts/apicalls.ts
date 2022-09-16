import { apiRequest } from "ducks/services/api";
import keycloak from "keycloak";

export const getInfo = async (): Promise<any> => {
    return apiRequest({
        method: "GET",
        url: window._env_.REACT_APP_LAMASSU_ALERTS + "/info"
    });
};

export const getEvents = async (): Promise<any> => {
    const url = window._env_.REACT_APP_LAMASSU_ALERTS + "/v1/lastevents";
    return apiRequest({
        method: "GET",
        url: url
    });
};

export const getSubscriptions = async (): Promise<any> => {
    const email = (await keycloak.loadUserProfile()).email;
    if (!email || email === "") {
        throw new Error("Email not found in token");
    }
    const url = window._env_.REACT_APP_LAMASSU_ALERTS + "/v1/subscriptions/" + email;

    return apiRequest({
        method: "GET",
        url: url
    });
};

export const subscribe = async (eventType: string): Promise<any> => {
    const url = window._env_.REACT_APP_LAMASSU_ALERTS + "/v1/subscribe";
    const email = (await keycloak.loadUserProfile()).email;

    if (!email || email === "") {
        throw new Error("Email not found in token");
    }
    return apiRequest({
        method: "POST",
        url: url,
        data: {
            event_type: eventType,
            email: email
        }
    });
};

export const unsubscribe = async (eventType: string): Promise<any> => {
    const url = window._env_.REACT_APP_LAMASSU_ALERTS + "/v1/unsubscribe";
    const email = (await keycloak.loadUserProfile()).email;

    if (!email || email === "") {
        throw new Error("Email not found in token");
    }
    return apiRequest({
        method: "POST",
        url: url,
        data: {
            event_type: eventType,
            email: email
        }
    });
};
