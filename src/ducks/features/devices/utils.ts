import { DeviceStatus, HistoricalCertStatus, ODeviceStatus, OHistoricalCertStatus } from "./models";

export const deviceStatusToColor = (status: DeviceStatus) => {
    switch (status) {
    case ODeviceStatus.DEVICE_PROVISIONED:
        return "green";
    case ODeviceStatus.CERT_REVOKED:
        return "red";
    case ODeviceStatus.PENDING_PROVISION:
        return "orange";
    default:
        return "gray";
    }
};

export const historicalCertStatusToColor = (status: HistoricalCertStatus) => {
    switch (status) {
    case OHistoricalCertStatus.ISSUED:
        return "green";
    case OHistoricalCertStatus.REVOKED:
        return "red";
    default:
        return "gray";
    }
};
