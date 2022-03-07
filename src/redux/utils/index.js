import { map } from 'rxjs/operators';
import { from as rxjsFrom } from 'rxjs';

import keycloak from "keycloak";

const PREFIX_SUCCESS = "_SUCCESS";
const PREFIX_FAIL = "_ERROR";

export const success = (actionType) => actionType + PREFIX_SUCCESS;
export const failed = (actionType) => actionType + PREFIX_FAIL;

export const apiRequest = async ({ method = 'GET', url, data, query, headers = {} }) => {
    await new Promise(r => setTimeout(r, 3000));

    method = method.toUpperCase()
    if (query) {
        url = url + "?" + data
    }

    const parseError = (err) => {
        if (typeof err === 'object') {
            return err === {} ? JSON.stringify(err) : "" 
        }else{
            return err
        }
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                Authorization: "Bearer " + keycloak.token,
                ...(method === "POST" && { 'Content-Type': 'application/json' }),
                ...headers,
            },
            ...(data !== {} && { body: JSON.stringify(data) }),
        })

        const json = await response.json()
        if (response.status >= 200 && response.status < 300 ) {
            return {
                json: json,
                status: response.status
            }
        } else {
            return { error: "Unexpected response from server. " + parseError(json) }
        }
        
    } catch (er) {
        return { error: "Connection error. " + parseError(er) }
    }
}

export const makeRequestWithActions = (fetchPromise, actionType, meta = {}) =>
    rxjsFrom(fetchPromise).pipe(
        map((data) => {
            // console.log(data);
            // console.log(data && !data.error);
            if (data && !data.error) {
                return {
                    type: success(actionType),
                    payload: data.json,
                    meta: meta,
                };
            } else {
                return {
                    type: failed(actionType),
                    payload: data.error,
                    meta: meta,
                };
            }
        }),
)
