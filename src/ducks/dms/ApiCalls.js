import keycloak from "keycloak";

export const getAllDms = async () => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_API + "/v1/csrs", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        if (resp.status != 200) {
            if (json) {
                return { error: json.error }
            }
        }else{
            return {
                json: json._embedded.csr,
                status: resp.status
            }
        }
    } catch (er) {
        return { error: "Connection error with API server" }
    }
}


export const createDms = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_API + "/v1/csrs/" + payload.dmsName, {
            method: "POST",
            headers: {
                'Content-Type': 'application/pkcs10',
                "Authorization": "Bearer " + keycloak.token,
            },
            body: payload.csr
        })
        const json = await resp.json()
        if (resp.status != 200) {
            if (json) {
                return { error: json.error }
            }
        }else{
            return {
                json: json,
                status: resp.status
            }
        }
    } catch (er) {
        return { error: "Connection error with API server" }
    }
}