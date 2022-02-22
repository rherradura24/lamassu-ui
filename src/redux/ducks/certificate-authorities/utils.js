import { caStatus, keyStrength } from "./Constants"

export const keyStrengthToColor = (strength) => {
    switch (strength) {
        case keyStrength.HIGH:
            return "green"
        case keyStrength.MEDIUM:
            return "orange"
        case keyStrength.LOW:
            return "red"
        default:
            return "gray"
    }
}

export const statusToColor = (keyStrength) => {
    switch (keyStrength) {
        case caStatus.ISSUED:
            return "green"
        case caStatus.REVOKED:
            return "red"
        case caStatus.EXPIRED:
            return "red"
        default:
            return "gray"
    }
}