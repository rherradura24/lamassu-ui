import { Theme } from "@mui/material";
import { DeviceStatus, ODeviceStatus, OSlotCertificateStatus, SlotCertificateStatus } from "./models";

export const deviceStatusToColor = (status: DeviceStatus) => {
    switch (status) {
    case ODeviceStatus.FULLY_PROVISIONED:
        return "green";
    case ODeviceStatus.DECOMMISSIONED:
        return "red";
    case ODeviceStatus.PENDING_PROVISIONING:
        return "orange";
    case ODeviceStatus.PROVISIONED_WITH_WARNINGS:
        return "orange";
    case ODeviceStatus.REQUIRES_ACTION:
        return "orange";
    default:
        return "gray";
    }
};
export const deviceStatusToColorWithTheme = (status: DeviceStatus, theme: Theme) => {
    switch (status) {
    case ODeviceStatus.FULLY_PROVISIONED:
        return theme.palette.chartsColors.green;
    case ODeviceStatus.DECOMMISSIONED:
        return theme.palette.chartsColors.purple;
    case ODeviceStatus.PENDING_PROVISIONING:
        return theme.palette.chartsColors.blue;
    case ODeviceStatus.PROVISIONED_WITH_WARNINGS:
        return theme.palette.chartsColors.yellow;
    case ODeviceStatus.REQUIRES_ACTION:
        return theme.palette.chartsColors.red;
    default:
        return "gray";
    }
};

export const slotCertificateStatusToColor = (status: SlotCertificateStatus) => {
    switch (status) {
    case OSlotCertificateStatus.ACTIVE:
        return "green";
    case OSlotCertificateStatus.EXPIRED:
        return "red";
    case OSlotCertificateStatus.ABOUT_TO_EXPIRE:
        return "orange";
    case OSlotCertificateStatus.REVOKED:
        return "red";
    default:
        return "gray";
    }
};
