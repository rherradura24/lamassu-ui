import { dmsStatus } from "./Constants"


export const statusToColor = (status) => {
    switch (status) {
        case dmsStatus.APPROVED:
            return "green"
        case dmsStatus.REVOKED:
            return "red"
        case dmsStatus.REJECTED:
            return "red"
        case dmsStatus.PENDING:
            return "orange"
        default:
            return "gray"
    }
}