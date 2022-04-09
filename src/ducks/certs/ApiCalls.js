import caList from "./mocks/ca-list.json";
import certsList from "./mocks/certs-list.json";

import keycloak from "keycloak";

const parseError = (err) => {
    return typeof err === 'object' ?  JSON.stringify(err) : err
}

const escapedJSONObject = (myJSON) => {
    var myJSONString = JSON.stringify(myJSON);
    var myEscapedJSONString = myJSONString.replace(/\\n/g, "\\n")
                                          .replace(/\\'/g, "\\'")
                                          .replace(/\\"/g, '\\"')
                                          .replace(/\\&/g, "\\&")
                                          .replace(/\\r/g, "\\r")
                                          .replace(/\\t/g, "\\t")
                                          .replace(/\\b/g, "\\b")
                                          .replace(/\\f/g, "\\f");
    return myEscapedJSONString
}



export const getCAs = async () => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/pki", {
            headers: {
                "Authorization": "Bearer " + keycloak.token
            }
        })
        const json = await resp.json()
        if (resp.status !== 200) {
            return {error: "Unexpected response from CA API server. " + parseError(json)}
        }else{
            return {
                json: json,
                status: resp.status
            }
        }
    } catch (er) {
        return { error: "Connection error with CA API server. " + parseError(er) }
    }
}

export const getCA = (caId) => {
    return new Promise((resolve, reject) => {
        resolve(caId)
    })
}

export const revokeCA = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/pki/" + payload.caName, {
            method: "DELETE",
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
        return { error: "Connection error with CA API server. " + er }
    }
}

export const createCA = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/pki/" + payload.caName, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + keycloak.token,
            },
            body: JSON.stringify(payload.body)
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
        return { error: "Connection error with CA API server. " + er }
    }
}

export const importCA = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/pki/import/" + payload.caName, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload.bundle)
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
        return { error: "Connection error with CA API server. " + er }
    }
}

export const bindAwsCAPolicy = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_RABBITMQ_ENDPOINT + "/api/exchanges/%2F/amq.default/publish", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "vhost":"/",
                "name":"amq.default",
                "properties":{
                   "delivery_mode":2,
                   "headers":{
                      
                   },
                   "content_type":"application/json"
                },
                "routing_key":"bind_ca_aws_policy_queue",
                "delivery_mode":"2",
                "payload":escapedJSONObject({policy: payload.policy, ca_name: payload.caName, serial_number: payload.serialNumber}),
                "headers":{
                   
                },
                "props":{
                   "content_type":"application/json"
                },
                "payload_encoding":"string"
             })
        })
        const json = await resp.json()
        if (resp.status != 200) {
            if (json) {
                return { error: json.error }
            }
        }else if (json.routed && json.routed == false){
            return { error: "Message was not routed" }
        }else{
            return {
                json: json,
                status: resp.status
            }
        }
    } catch (er) {
        console.log(er);
        return { error: "Connection error with CA API server. " + er }
    }
}

export const getCerts = async (caType, caName) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/"+caType+"/"+caName+"/issued" , {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token,
            }
        })

        const json = await resp.json()
        if (resp.status !== 200) {
            return {error: "Unexpected response from CA API server. " + parseError(json)}
        }else{
            return {
                json: json,
                status: resp.status
            }
        }
    } catch (er) {
        return { error: "Connection error with CA API server. " + parseError(er) }
    }
}

export const revokeCert = async (payload) => {
    try {
        const resp = await fetch(window._env_.REACT_APP_CA_API + "/v1/pki/" + payload.caName + "/cert/" + payload.serialNumber, {
            method: "DELETE",
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
        return { error: "Connection error with CA API server. " + er }
    }
}