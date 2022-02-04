window._env_ = {
    REACT_APP_RABBITMQ_ENDPOINT: "https://rabbitmq.${DOMAIN}",
    REACT_APP_AUTH_ENDPOINT: "https://auth.${DOMAIN}/auth",
    REACT_APP_AUTH_REALM: "lamassu",
    REACT_APP_AUTH_CLIENT_ID: "frontend",
    REACT_APP_CA_API: "https://${DOMAIN}/api/ca",
    REACT_APP_DMS_ENROLLER_API: "https://${DOMAIN}/api/dmsenroller",
    REACT_APP_DEVICES_API: "https://${DOMAIN}/api/devmanager",
    REACT_APP_DEFAULT_DMS_URL: "https://default-dms.${DOMAIN}",
}