import { AWSPolicyStatus, AWSSyncCAStatus, CloudProviderHealthStatus, OAWSDeviceCertificateStatus, OAWSPolicyStatus, OAWSSyncCAStatus, OCloudProviderHealthStatus } from "./models";

export const cloudConnectorStatusToColor = (status: CloudProviderHealthStatus) => {
    switch (status) {
    case OCloudProviderHealthStatus.Passing:
        return "green";
    case OCloudProviderHealthStatus.Critical:
        return "red";
    default:
        return "gray";
    }
};

export const awsCaStatusToColor = (status: AWSSyncCAStatus) => {
    switch (status) {
    case OAWSSyncCAStatus.Active:
        return "green";
    case OAWSSyncCAStatus.Inactive:
        return "orange";
    default:
        return "gray";
    }
};

export const awsPolicyStatusToColor = (status: AWSPolicyStatus) => {
    switch (status) {
    case OAWSPolicyStatus.Active:
        return "green";
    case OAWSPolicyStatus.NoPolicy:
        return "red";
    default:
        return "gray";
    }
};

export const awsDeviceStatusToColor = (status: AWSPolicyStatus) => {
    switch (status) {
    case OAWSDeviceCertificateStatus.Active:
        return "green";
    case OAWSDeviceCertificateStatus.Inactive:
        return "orange";
    case OAWSDeviceCertificateStatus.Revoked:
        return "red";
    default:
        return "gray";
    }
};
