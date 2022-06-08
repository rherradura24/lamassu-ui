import { KeyStrength, KeyType } from "../cas/models";

export class GetDMSsListAPIResponse {
    public total_dmss!: number
    public dmss!: Array<DMS>

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class DMS {
    public id!: string
    public name!: string

    public key_metadata!: {
        bits: number
        strength: KeyStrength
        strength_color: string
        type: KeyType
    }

    public subject!: {
        common_name?: string
        country?: string
        locality?: string
        organization?: string
        organization_unit?: string
        state?: string
    }

    public creation_timestamp!: Date
    public modification_timestamp!: Date
    public status!: DMSStatus
    public status_color!: string
    public crt!: string
    public csr!: string

    public authorized_cas!: Array<string>

    constructor (args?: {}) {
        this.authorized_cas = [];
        Object.assign(this, args);
    }
}

export const ODMSStatus = {
    PendingApproval: "Pending Approval",
    Approved: "Approved",
    Denied: "Denied",
    Revoked: "Revoked"
};

export type DMSStatus = typeof ODMSStatus[keyof typeof ODMSStatus];
