import getCasMock from "./mocks/get-cas.json";
import getIssuedCertsMock from "./mocks/issued-certs.json";

export const getCAs = async () => {
    /*
    try {
        const resp = await fetch(process.env.REACT_APP_LAMASSU_CA_API + "/v1/pki", {
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
    */
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({
                json: getCasMock,
                status: 200
            })
        }, 5000)
    });

}

export const getIssuedCerts = async () => {
    /*
    try {
        const resp = await fetch(process.env.REACT_APP_LAMASSU_CA_API + "/v1/pki", {
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
    */
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve({
                json: getIssuedCertsMock,
                status: 200
            })
        }, 5000)
    });

}
