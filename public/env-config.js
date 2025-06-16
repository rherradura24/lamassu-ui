window._env_ =  {
    "INFO": {
        "UI_VERSION": "3.1.0",
        "BUILD_ID": "",
        "BUILD_TIME": "2024-10-25T08:03:55Z",
        "CHART_VERSION": "3.1.0",
        "HELM_REVISION": "9"
    },
    "AUTH": {
        "ENABLED": true,
        "COGNITO": {
            "ENABLED": false,
            // AWS //
            "HOSTED_UI_DOMAIN": "https://eu-central-1d632wclij.auth.eu-central-1.amazoncognito.com",
            // AWS 2 //
            // "HOSTED_UI_DOMAIN": "https://lamassu-dev.auth.eu-west-1.amazoncognito.com",
        },
        "OIDC": {
            // KEYCLOAK //
            "AUTHORITY": "https://sandbox.lamassu.io/auth/realms/lamassu",
            "CLIENT_ID": "frontend"
            // "AUTHORITY": "https://www.azcuetechnicalservices.com/auth/realms/azcue-realm",
            // "CLIENT_ID": "react-login-client"

            // COGNITO //
            // "AUTHORITY" : "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_D632WCLIj",
            // "CLIENT_ID": "1ghj90mfvmhiosq6rj85ub4fbo"

            // COGNITO 2 //
            // "AUTHORITY": "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_d2VFzoHA2",
            // "CLIENT_ID": "2sskv9h3clq7ctls2sg7u4grlk"

            // ENTRA ID //
            // "AUTHORITY": "https://login.microsoftonline.com/f0bdc1c9-5148-4f86-ac40-edd976e1814c/v2.0",
            // "CLIENT_ID": "5480308a-30d2-4731-bcf7-e4ba4d3c8c21"
        }
    },
    // SANDBOX //
    "LAMASSU_CA_API": "https://sandbox.lamassu.io/api/ca",
    "LAMASSU_DMS_MANAGER_API": "https://sandbox.lamassu.io/api/dmsmanager",
    "LAMASSU_DEVMANAGER_API": "https://sandbox.lamassu.io/api/devmanager",
    "LAMASSU_ALERTS_API": "https://sandbox.lamassu.io/api/alerts",
    "LAMASSU_VA_API": "https://sandbox.lamassu.io/api/va",

    // AWS //
    // "LAMASSU_CA_API": "https://lamassu-app-load-balancer-705638623.eu-west-1.elb.amazonaws.com/prod/ca",
    // "LAMASSU_DMS_MANAGER_API": "https://lamassu-app-load-balancer-705638623.eu-west-1.elb.amazonaws.com/prod/dmsmanager",
    // "LAMASSU_DEVMANAGER_API": "https://lamassu-app-load-balancer-705638623.eu-west-1.elb.amazonaws.com/prod/devmanager",
    // "LAMASSU_ALERTS_API": "https://lamassu-app-load-balancer-705638623.eu-west-1.elb.amazonaws.com/prod/alerts",
    // "LAMASSU_VA_API": "https://lamassu-app-load-balancer-705638623.eu-west-1.elb.amazonaws.com/prod/va",

    // LOCALHOST //
    // "LAMASSU_CA_API": "https://localhost:8443/api/ca",
    // "LAMASSU_DMS_MANAGER_API": "https://localhost:8443/api/dmsmanager",
    // "LAMASSU_DEVMANAGER_API": "https://localhost:8443/api/devmanager",
    // "LAMASSU_ALERTS_API": "https://localhost:8443/api/alerts",
    // "LAMASSU_VA_API": "https://localhost:8443/api/va",

    "LAMASSU_VDMS": "",
    "LAMASSU_VDMS": "",
    "LAMASSU_VDEVICE": "",
    "CLOUD_CONNECTORS": [
        "aws.lks"
    ]
}