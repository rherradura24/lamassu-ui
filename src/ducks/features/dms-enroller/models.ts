import { KeyStrength, KeyType } from "../cas/models";
export class DMSManagerInfo {
    public build_version!: string
    public build_time!: string
    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class GetDMSsListAPIResponse {
    public total_dmss!: number
    public dmss!: Array<DMS>

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class DMS {
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
    public last_status_update_timestamp!: Date
    public status!: DMSStatus
    public status_color!: string
    public certificate!: string
    public certificate_request!: string

    public authorized_cas!: Array<string>

    constructor (args?: {}) {
        this.authorized_cas = [];
        Object.assign(this, args);
    }
}

export const ODMSStatus = {
    PENDING_APPROVAL: "PENDING_APPROVAL",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    EXPIRED: "EXPIRED",
    REVOKED: "REVOKED"
};

export type DMSStatus = typeof ODMSStatus[keyof typeof ODMSStatus];
