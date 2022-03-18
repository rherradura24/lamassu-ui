import Keycloak from "keycloak-js"

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloakProps = {
  url: window._env_.REACT_APP_AUTH_ENDPOINT,
  realm: window._env_.REACT_APP_AUTH_REALM,
  clientId: window._env_.REACT_APP_AUTH_CLIENT_ID
}

const keycloak = new Keycloak(keycloakProps)

export default keycloak
export {
  keycloakProps
}
