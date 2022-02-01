
const prefix = "certs/"

export const GET_CAS = prefix + 'GET_CAS';
export const GET_CAS_SUCCESS = prefix + 'GET_CAS_SUCCESS';
export const GET_CAS_ERROR = prefix + 'GET_CAS_ERROR';

export const GET_CA = prefix + 'GET_CA';
export const GET_CA_SUCCESS = prefix + 'GET_CA_SUCCESS';
export const GET_CA_ERROR = prefix + 'GET_CA_ERROR';

export const GET_CERTS = prefix + 'GET_CERTS';
export const GET_CERTS_SUCCESS = prefix + 'GET_CERTS_SUCCESS';
export const GET_CERTS_ERROR = prefix + 'GET_CERTS_ERROR';

export const GET_CERT = prefix + 'GET_CERT';
export const GET_CERT_SUCCESS = prefix + 'GET_CERT_SUCCESS';
export const GET_CERT_ERROR = prefix + 'GET_CERT_ERROR';

export const REVOKE_CA = prefix + 'REVOKE_CA';
export const REVOKE_CA_SUCCESS = prefix + 'REVOKE_CA_SUCCESS';
export const REVOKE_CA_ERROR = prefix + 'REVOKE_CA_ERROR';

export const CREATE_CA = prefix + 'CREATE_CA';
export const CREATE_CA_SUCCESS = prefix + 'CREATE_CA_SUCCESS';
export const CREATE_CA_ERROR = prefix + 'CREATE_CA_ERROR';

export const IMPORT_CA = prefix + 'IMPORT_CA';
export const IMPORT_CA_SUCCESS = prefix + 'IMPORT_CA_SUCCESS';
export const IMPORT_CA_ERROR = prefix + 'IMPORT_CA_ERROR';

export const BIND_AWS_CA_POLICY = prefix + 'BIND_AWS_CA_POLICY';
export const BIND_AWS_CA_POLICY_SUCCESS = prefix + 'BIND_AWS_CA_POLICY_SUCCESS';
export const BIND_AWS_CA_POLICY_ERROR = prefix + 'BIND_AWS_CA_POLICY_ERROR';

export const CREATE_CERT = prefix + 'CREATE_CERT';
export const CREATE_CERT_SUCCESS = prefix + 'CREATE_CERT_SUCCESS';
export const CREATE_CERT_ERROR = prefix + 'CREATE_CERT_ERROR';

export const REVOKE_CERT = prefix + 'REVOKE_CERT';
export const REVOKE_CERT_SUCCESS = prefix + 'REVOKE_CERT_SUCCESS';
export const REVOKE_CERT_ERROR = prefix + 'REVOKE_CERT_ERROR';

export const ERRORS = [
    GET_CAS_ERROR,
    GET_CA_ERROR,
    REVOKE_CA_ERROR,
    CREATE_CA_ERROR,
    IMPORT_CA_ERROR,
    
    CREATE_CERT_ERROR,
    GET_CERTS_ERROR,
    GET_CERT_ERROR,
    REVOKE_CERT_ERROR
]