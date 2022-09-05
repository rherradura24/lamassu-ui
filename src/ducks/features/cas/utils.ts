import { CAStatus, KeyStrength, OCAStatus, OKeyStrength } from "./models";

export const keyStrengthToColor = (strength: KeyStrength) => {
    switch (strength) {
    case OKeyStrength.HIGH:
        return "green";
    case OKeyStrength.MEDIUM:
        return "orange";
    case OKeyStrength.LOW:
        return "red";
    default:
        return "gray";
    }
};

export const statusToColor = (keyStrength: CAStatus) => {
    switch (keyStrength) {
    case OCAStatus.ACTIVE:
        return "green";
    case OCAStatus.ABOUT_TO_EXPIRED:
        return "orange";
    case OCAStatus.EXPIRED:
        return "red";
    case OCAStatus.REVOKED:
        return "red";
    default:
        return "gray";
    }
};
