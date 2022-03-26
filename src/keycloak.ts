import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloakProps: Keycloak.KeycloakConfig = {
    url: window._env_.REACT_APP_AUTH_ENDPOINT,
    realm: window._env_.REACT_APP_AUTH_REALM,
    clientId: window._env_.REACT_APP_AUTH_CLIENT_ID
};

const keycloakInstance: Keycloak.KeycloakInstance = Keycloak(keycloakProps);

export default keycloakInstance;
export {
    keycloakProps
};
