import * as t from "./ActionTypes";

export const getConsulServices = () => ({
    type: t.GET_SERVICES,
})
  
export const getServiceHealth = (serviceName) => ({
    type: t.GET_SERVICE_HEALTH,
    payload: {
        serviceName: serviceName
    }
})