import { dmsStatus, keyStrength } from "./Constants"

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
