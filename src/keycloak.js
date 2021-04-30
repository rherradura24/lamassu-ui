import Keycloak from 'keycloak-js'
 
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloakProps = {
    url: 'http://localhost:8080/auth',
    realm: 'lamassuiot',
    clientId: 'frontend',
}

const keycloak = new Keycloak(keycloakProps)
 
export default keycloak
export {
    keycloakProps
}