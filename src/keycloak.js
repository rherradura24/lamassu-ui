import Keycloak from 'keycloak-js'
 
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloakProps = {
    url: process.env.REACT_APP_AUTH_ENDPOINT,
    realm: process.env.REACT_APP_AUTH_REALM, 
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
}

const keycloak = new Keycloak(keycloakProps)
 
export default keycloak
export {
    keycloakProps
}