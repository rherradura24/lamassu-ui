import { cloudConnectorStatus, synchronizedCaStatus, awsIotCoreConstants } from "./Constants"

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

export const awsCaStatusColor = (status) => {
  switch (status) {
    case awsIotCoreConstants.CASatus.ACTIVE:
      return "green"
    case awsIotCoreConstants.CASatus.INACTIVE:
      return "orange"
    default:
      return "gray"
  }
}

export const awsPolicyStatusColor = (status) => {
  switch (status) {
    case awsIotCoreConstants.PolicyStatus.ACTIVE:
      return "green"
    case awsIotCoreConstants.PolicyStatus.INCONSISTENT:
      return "red"
    case awsIotCoreConstants.PolicyStatus.NOPOLICY:
      return "red"
    default:
      return "gray"
  }
}