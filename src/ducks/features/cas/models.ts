
export class GetCAsListAPIResponse {
    public total_cas!: number
    public cas!: Array<CertificateAuthority>

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class CAStats {
    public issued_certs!: number
    public cas!: number
    public scan_date!: Date
}

export class CertificateAuthority {
    public certificate!: {
        pem_base64: string
        public_key_base64: string
    }

    public key_metadata!: {
        bits: number
        strength: KeyStrength
        strength_color: string
        type: KeyType
    }

    public name!: string
    public serial_number!: string
    public status!: CAStatus
    public status_color!: string
    public subject!: {
        common_name: string
        country: string
        locality: string
        organization: string
        organization_unit: string
        state: string
    }

    public valid_from!: Date
    public valid_to!: Date

    public total_issued_certs!: number
    public issued_certs!: Array<Certificate>

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class Certificate {
    public certificate!: {
        pem_base64: string
        public_key_base64: string
    }

    public key_metadata!: {
        bits: number
        strength: KeyStrength
        strength_color: string
        type: KeyType
    }

    public serial_number!: string
    public status!: CAStatus
    public status_color!: string
    public subject!: {
        common_name: string
        country: string
        locality: string
        organization: string
        organization_unit: string
        state: string
    }

    public valid_from!: Date
    public valid_to!: Date

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export const OKeyStrength = {
    High: "High",
    Medium: "Medium",
    Low: "Low"
};

export const OKeyType = {
    RSA: "RSA",
    EC: "EC"
};

export const OCAStatus = {
    Issued: "Issued",
    Expired: "Expired",
    Revoked: "Revoked"
};

export type KeyStrength = typeof OKeyStrength[keyof typeof OKeyStrength];
export type KeyType = typeof OKeyType[keyof typeof OKeyType];
export type CAStatus = typeof OCAStatus[keyof typeof OCAStatus];
