import { cloudConnectorStatus, synchronizedCaStatus } from "./Constants"

export const cloudConnectorStatusToColor = (status) => {
    switch (status) {
        case cloudConnectorStatus.CRITICAL:
            return "red"
        case cloudConnectorStatus.HEALTHY:
            return "green"
        default:
            return "gray"
    }
}

export const synchronizedCaStatusToColor = (status) => {
    switch (status) {
        case synchronizedCaStatus.SYNCHRONIZED:
            return "green"
        case synchronizedCaStatus.UNSYNCHRONIZED:
            return "red"
        default:
            return "gray"
    }
}