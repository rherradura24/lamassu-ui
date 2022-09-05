import { DMSStatus, ODMSStatus } from "./models";

export const dmsStatusToColor = (status: DMSStatus) => {
    switch (status) {
    case ODMSStatus.APPROVED:
        return "green";
    case ODMSStatus.REJECTED:
        return "red";
    case ODMSStatus.REVOKED:
        return "red";
    case ODMSStatus.PENDING_APPROVAL:
        return "orange";
    case ODMSStatus.EXPIRED:
        return "red";
    default:
        return "gray";
    }
};
