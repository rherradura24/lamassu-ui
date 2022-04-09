export class CloudConnector {
    public cloud_provider!: CloudProvider
    public id!: string
    public name!: string
    public status!: CloudProviderHealthStatus
    public status_color!: string
    public ip!: string
    public port!: string

    public synchronized_cas!: Array<SynchronizedCA>

    public devices_config: Array<any>

    constructor (args?: {}) {
        Object.assign(this, args);
        this.devices_config = [];
    }
}

export class SynchronizedCA {
    public ca_name!: string
    public serial_number!: string
    public enabled!: Date
    public consistency_status!: CloudProviderConsistencyStatus

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class AWSCloudConnector extends CloudConnector {
    public synchronized_cas!: Array<AWSSynchronizedCA>
    public cloud_configuration!: AWSCloudConfig

    constructor (args?: {}) {
        super(args);
        this.cloud_provider = "aws";
        Object.assign(this, args);
    }
}

export class AWSSynchronizedCA extends SynchronizedCA {
    public config!: {
        arn: string
        id: string
        creation_date: Date
        name: string
        status: AWSSyncCAStatus
        status_color: string
        policy_status: AWSPolicyStatus
        policy_status_color: string
        policy_document?: string
    }

    constructor (args?: {}) {
        super(args);
        Object.assign(this, args);
    }
}

export class CloudConfig { }
export class AWSCloudConfig extends CloudConfig {
    public iot_core_endpoint!: string
    public account_id!: string
}

export const OCloudProvider = {
    Aws: "aws",
    Azure: "azure",
    GCloud: "gcloud"
};

export const OCloudProviderHealthStatus = {
    Critical: "Critical",
    Passing: "Passing"
};

export const OCloudProviderConsistencyStatus = {
    Consistent: "CONSISTENT",
    Inconsistent: "INCONSISTENT"
};
export const OAWSSyncCAStatus = {
    Inactive: "Inactive",
    Active: "Active"
};
export const OAWSPolicyStatus = {
    NoPolicy: "NoPolicy",
    Active: "Active"
};

export type CloudProvider = typeof OCloudProvider[keyof typeof OCloudProvider];
export type CloudProviderHealthStatus = typeof OCloudProviderHealthStatus[keyof typeof OCloudProviderHealthStatus];
export type CloudProviderConsistencyStatus = typeof OCloudProviderConsistencyStatus[keyof typeof OCloudProviderConsistencyStatus];
export type AWSSyncCAStatus = typeof OAWSSyncCAStatus[keyof typeof OAWSSyncCAStatus];
export type AWSPolicyStatus = typeof OAWSPolicyStatus[keyof typeof OAWSPolicyStatus];

export class AWSDeviceCertificate {
    public config!: {
        arn: string
        id: string
        status: AWSDeviceCertificateStatus
        status_color: string
        update_date: Date,
    }

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class AWSDeviceConfig {
    public aws_id!: string
    public device_id!: string
    public last_connection!: Date | null
    public certificates!: Array<AWSDeviceCertificate>

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export const OAWSDeviceCertificateStatus = {
    Revoked: "Revoked",
    Inactive: "Inactive",
    Active: "Active"
};
export type AWSDeviceCertificateStatus = typeof OAWSDeviceCertificateStatus[keyof typeof OAWSDeviceCertificateStatus];
