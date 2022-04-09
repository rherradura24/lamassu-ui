
export const getConsulServices = async() => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CONSUL_API + "/v1/catalog/services", {
            method: "GET",
            /*headers: {
                "Authorization": "Bearer " + keycloak.token,
            },*/
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
        console.log(er);
        return { error: "Connection error with Consul server. " + er }
    }
}

export const getServiceHealth = async(payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CONSUL_API + "/v1/health/checks/" + payload.serviceName, {
            method: "GET",
            /*headers: {
                "Authorization": "Bearer " + keycloak.token,
            },*/
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
        console.log(er);
        return { error: "Connection error with Consul server. " + er }
    }
}