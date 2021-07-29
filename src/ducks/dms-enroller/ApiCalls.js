import keycloak from "keycloak";

const parseError = (err) => {
   return typeof err === 'object' ?  JSON.stringify(err) : err
}

export const getAllDms = async () => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_ENROLLER_API + "/v1/csrs", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })

        var data = undefined
        const contentType = resp.headers.get("content-type");
        if (contentType && contentType.indexOf("json") !== -1) {
            const jsonData = await resp.json()
            data = jsonData
        } else {
            const text = await resp.text()
            data = text
        }

        if (resp.status != 200) {
            return { error: data }
        }else{
            console.log(data);
            if("_embedded" in data){
                var jsonData = data._embedded.csr
                if (!Array.isArray(jsonData)){
                    jsonData = [data._embedded.csr]
                }
                return {
                    json: jsonData,
                    status: resp.status
                }
            }else{
                return {
                    json: [],
                    status: resp.status
                }
            }
        }
    } catch (er) {
        console.log(er);
        return { error: "Connection error with DMS Enroller API server. " + parseError(er) }
    }
}


export const createDmsViaCsr = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_ENROLLER_API + "/v1/csrs/" + payload.dmsName, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + keycloak.token,
            },
            body: JSON.parse({
                csr: payload.csr,
                url: payload.url
            })
                
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
        return { error: "Connection error with DMS Enroller API server. " + er }
    }
}

export const createDmsViaForm = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_ENROLLER_API + "/v1/csrs/" + payload.dmsName + "/form", {
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
        return { error: "Connection error with DMS Enroller API server. " + er }
    }
}

export const updateDmsStatus = async (payload) => {
    console.log(payload);
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_ENROLLER_API + "/v1/csrs/" + payload.id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
                'Content-Type': 'application/json',
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
        return { error: "Connection error with DMS Enroller API server. " + er }
    }
}

export const getDmsCert = async (payload) => {
    console.log(payload);
    try {
        const resp = await fetch(window._env_.REACT_APP_DMS_ENROLLER_API + "/v1/csrs/" + payload.id + "/crt", {
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
        return { error: "Connection error with DMS Enroller API server. " + er }
    }
}

export const getLastIssuedCertPerDms = async () => {
    try {
        const resp = await fetch(window._env_.REACT_APP_DEVICES_API + "/v1/devices/dms-cert-history/last-issued", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            },
        })
        const json = await resp.json()
        return {
            json: json,
            status: resp.status
        }
    } catch (er) {
        return { error: "Connection error with Devices API server. " + er }
    }
}