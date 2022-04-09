import { KeyStrength, KeyType } from "../cas/models";

export class GetDeviceListAPIResponse {
    public total!: number
    public devices!: Array<Device>

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class Device {
    public id!: string
    public alias!: string
    public description!: string
    public tags!: Array<string>
    public icon_name!: string
    public icon_color!: string
    public status!: DeviceStatus
    public status_color!: DeviceStatus
    public dms_id!: string
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
    public current_certificate!: {
        crt: string
        serial_number: string
        valid_to: Date
    }

    public historicalCerts!: Array<HistoricalCert>

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class HistoricalCert {
    public device_id!: string
    public serial_number!: string
    public issuer_serial_number!: string
    public issuer_name!: string
    public status!: HistoricalCertStatus
    public status_color!: string
    public creation_timestamp!: Date
    public revocation_timestamp!: Date

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export const ODeviceStatus = {
    DEVICE_PROVISIONED: "Device Provisioned",
    CERT_REVOKED: "Cert Revoked",
    PENDING_PROVISION: "Pending Provision"
};

export const OHistoricalCertStatus = {
    ACTIVE: "Active",
    REVOKED: "Revoked"
};

export type HistoricalCertStatus = typeof OHistoricalCertStatus[keyof typeof OHistoricalCertStatus];
export type DeviceStatus = typeof ODeviceStatus[keyof typeof ODeviceStatus];
