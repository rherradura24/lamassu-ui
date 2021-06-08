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
            var jsonData = json._embedded.csr
            if (!Array.isArray(jsonData)){
                jsonData = [json._embedded.csr]
            }
            return {
                json: jsonData,
                status: resp.status
            }
        }
    } catch (er) {
        return { error: "Connection error with API server" }
    }
}


export const createDmsViaCsr = async (payload) => {
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

export const createDmsViaForm = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_API + "/v1/csrs/" + payload.dmsName + "/form", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + keycloak.token,
            },
            body: JSON.stringify(payload.csrForm)
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

export const updateDmsStatus = async (payload) => {
    console.log(payload);
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_API + "/v1/csrs/" + payload.id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
            body: JSON.stringify(payload.dms)
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

export const getDmsCert = async (payload) => {
    console.log(payload);
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_API + "/v1/csrs/" + payload.id + "/crt", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const text = await resp.text()
        if (resp.status != 200) {
            return { error: text}
        }else{
            return {
                json: text,
                status: resp.status
            }
        }
    } catch (er) {
        return { error: "Connection error with API server" }
    }
}