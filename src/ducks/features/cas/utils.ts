import { CAStatus, KeyStrength, OCAStatus, OKeyStrength } from "./models";

export const keyStrengthToColor = (strength: KeyStrength) => {
    switch (strength) {
    case OKeyStrength.High:
        return "green";
    case OKeyStrength.Medium:
        return "orange";
    case OKeyStrength.Low:
        return "red";
    default:
        return "gray";
    }
};

export const statusToColor = (keyStrength: CAStatus) => {
    switch (keyStrength) {
    case OCAStatus.Issued:
        return "green";
    case OCAStatus.Expired:
        return "red";
    case OCAStatus.Revoked:
        return "red";
    default:
        return "gray";
    }
};
