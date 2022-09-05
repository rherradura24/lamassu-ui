export class CloudProxyInfo {
    public build_version!: string
    public build_time!: string
    constructor (args?: {}) {
        Object.assign(this, args);
    }
}
export class CloudConnectorDeviceConfig {
    public device_id!: string
    public config!: Map<string, any>

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class CloudConnector {
    public cloud_provider!: CloudProvider
    public id!: string
    public name!: string
    public port!: number
    public ip!: string
    public protocol!: string
    public status!: CloudProviderHealthStatus
    public status_color!: string

    public synchronized_cas!: Array<SynchronizedCA>
    public configuration: any

    constructor (args?: {}) {
        Object.assign(this, args);
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
export class AzureCloudConnector extends CloudConnector {
    public synchronized_cas!: Array<AzureSynchronizedCA>
    public configuration!: AzureCloudConfig

    constructor (args?: {}) {
        super(args);
        this.cloud_provider = "aws";
        Object.assign(this, args);
    }
}

export class AWSSynchronizedCA extends SynchronizedCA {
    public configuration!: {
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

export class AzureSynchronizedCA extends SynchronizedCA {
    public config!: {
        CaName: string
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

export class AzureCloudConfig extends CloudConfig {
    public subscription_id!: string
    public tenant_id!: string
    public resource_group!: string
    public dps_endpoint!: string
    public iot_hub_name!: string
}

export const OCloudProvider = {
    Aws: "AWS",
    Azure: "AZURE"
};

export const OCloudProviderHealthStatus = {
    Critical: "critical",
    Passing: "passing"
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
    public arn!: string
    public id!: string
    public status!: AWSDeviceCertificateStatus
    public status_color!: string
    public update_date!: Date

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class AWSDeviceConfig {
    public aws_id!: string
    public last_connection!: Date | null
    public certificates!: Array<AWSDeviceCertificate>

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class AzureDeviceConfig {
   public cloud_to_device_message_count!: number
   public connection_state!: string
   public connection_state_updated_time!: string
   public device_id!: string
   public etag!: string
   public generation_id!: string
   public last_activity_time!: string
   public status!: AzureDeviceStatus
   public status_color!: string
   public status_updated_time!: string

   constructor (args?: {}) {
       Object.assign(this, args);
   }
}

export const OAWSDeviceCertificateStatus = {
    Revoked: "REVOKED",
    Inactive: "INACTIVE",
    Active: "ACTIVE"
};

export const OAzureDeviceStatus = {
    Enabled: "enabled",
    Disabled: "disabled"
};

export type AWSDeviceCertificateStatus = typeof OAWSDeviceCertificateStatus[keyof typeof OAWSDeviceCertificateStatus];
export type AzureDeviceStatus = typeof OAzureDeviceStatus[keyof typeof OAzureDeviceStatus];
