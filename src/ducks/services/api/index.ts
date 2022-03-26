import { map } from "rxjs/operators";
import { from as rxjsFrom } from "rxjs";
import { failed, success } from "ducks/actionTypes";

import keycloak from "keycloak";

interface apiRequestProps {
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    data?: object,
    query?: string,
    headers?: object
}

export const apiRequest = async ({ method = "GET", url, data, query, headers = {} }: apiRequestProps) => {
    const token = keycloak.token;

    // await new Promise(r => setTimeout(r, 2000));
    console.log(Date.now(), method, url);
    if (query) {
        url = url + "?" + data;
    }

    const parseError = (err: any) : any => {
        if (typeof err === "object") {
            if (err !== {}) {
                if (err.error) {
                    return err.error;
                }
                JSON.stringify(err);
                return "";
            }
            return "";
        }
        return err;
    };

    try {
        const response = await fetch(url, {
            method,
            headers: {
                Authorization: "Bearer " + token,
                ...(method === "POST" && { "Content-Type": "application/json" }),
                ...headers
            },
            ...(data !== {} && { body: JSON.stringify(data) })
        });

        const json = await response.json();
        if (response.status >= 200 && response.status < 300) {
            return {
                json,
                status: response.status
            };
        }
        return { error: "Unexpected response from server. " + parseError(json) };
    } catch (er) {
        return { error: "Connection error. " + parseError(er) };
    }
};

export const makeRequestWithActions = (fetchPromise: Promise<any>, actionType: string, meta = {}) =>
    rxjsFrom(fetchPromise).pipe(
        map((data) => {
            console.log(data);
            // console.log(data && !data.error);
            if (data && !data.error) {
                return {
                    type: success(actionType),
                    payload: data.json,
                    meta
                };
            }
            return {
                type: failed(actionType),
                payload: data.error,
                meta
            };
        })
    );
