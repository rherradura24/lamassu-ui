import { apiRequest } from "redux/utils"

export const getDevices = async () => {
  return apiRequest({
    method: "GET",
    url: window._env_.REACT_APP_LAMASSU_DEVMANAGER + "/v1/devices"
  })
}
