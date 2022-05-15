import { createAsyncAction } from "typesafe-actions";
import { failed, success } from "ducks/actionTypes";
import { CertificateAuthority } from "./models";

export const actionTypes = {
    GET_CAS: "GET_CAS",
    GET_ISSUED_CERTS: "GET_ISSUED_CERTS",
    CREATE_CA: "CREATE_CA",
    IMPORT_CA: "IMPORT_CA",
    REVOKE_CA: "REVOKE_CA",
    REVOKE_CERT: "REVOKE_CERT"
};

export const getCAsAction = createAsyncAction(
    [actionTypes.GET_CAS, () => { }],
    [success(actionTypes.GET_CAS), (req: Array<CertificateAuthority>) => req],
    [failed(actionTypes.GET_CAS), (req: Error) => req]

)();

export type GetIssuedCerts = {
    caName: string,
    offset: number,
    page: number
}

export type GetIssuedCertsResponse = {
    certs: Array<CertificateAuthority>
    total_certs: number
}

export const getIssuedCertsActions = createAsyncAction(
    [actionTypes.GET_ISSUED_CERTS, (req: GetIssuedCerts) => req],
    [success(actionTypes.GET_ISSUED_CERTS), (req: GetIssuedCertsResponse, meta: any) => req, (req: GetIssuedCertsResponse, meta: any) => meta],
    [failed(actionTypes.GET_ISSUED_CERTS), (req: Error) => req]

)();

export type CreateCA = {
    caName: string
    selectedConnectorIDs: Array<string>,
    body: {
        subject: {
            country: string,
            state: string,
            locality: string,
            organization: string,
            organization_unit: string,
            common_name: string
        },
        key_metadata: {
            type: string,
            bits: number
        },
        ca_ttl: number,
        enroller_ttl: number
    }
}

export const createCAAction = createAsyncAction(
    [actionTypes.CREATE_CA, (req: CreateCA) => req],
    [success(actionTypes.CREATE_CA), (req: CertificateAuthority) => req],
    [failed(actionTypes.CREATE_CA), (req: Error) => req]
)();

export type ImportCA = {
    caName: string
    selectedConnectorIDs: Array<string>,
    certificateB64: string,
    privatekeyB64: string,
    enroller_ttl: number
}
export const importCAAction = createAsyncAction(
    [actionTypes.IMPORT_CA, (req: ImportCA) => req],
    [success(actionTypes.IMPORT_CA), (req: CertificateAuthority) => req],
    [failed(actionTypes.IMPORT_CA), (req: Error) => req]
)();

export type RevokeCA = {
    caName: string
}
export const revokeCAAction = createAsyncAction(
    [actionTypes.REVOKE_CA, (req: RevokeCA) => req],
    [success(actionTypes.REVOKE_CA), (req: any, meta: RevokeCA) => req, (req: any, meta: RevokeCA) => meta],
    [failed(actionTypes.REVOKE_CA), (req: Error) => req]
)();

export type RevokeCert = {
    caName: string,
    serialNumber: string
}
export const revokeCertAction = createAsyncAction(
    [actionTypes.REVOKE_CERT, (req: RevokeCert) => req],
    [success(actionTypes.REVOKE_CERT), (req: any, meta: RevokeCert) => req, (req: any, meta: RevokeCert) => meta],
    [failed(actionTypes.REVOKE_CERT), (req: Error) => req]
)();
