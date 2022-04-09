import { DMSStatus, ODMSStatus } from "./models";

export const dmsStatusToColor = (status: DMSStatus) => {
    switch (status) {
    case ODMSStatus.Approved:
        return "green";
    case ODMSStatus.Denied:
        return "red";
    case ODMSStatus.Revoked:
        return "red";
    case ODMSStatus.PendingApproval:
        return "orange";
    default:
        return "gray";
    }
};
