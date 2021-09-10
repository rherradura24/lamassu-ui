import * as actions from "./ActionTypes"

const consulReducer = (state = { services: {} }, action) => {
  switch (action.type) {
    case actions.GET_SERVICES_SUCCESS:
      var svc = {}
      const consulSvcKeys = Object.keys(action.payload)
      consulSvcKeys.forEach(key => {
        svc[key]={
          name: key,
          serviceInstances: 0,
          status: []
        }
      });
      return { ...state, services: svc}
    case actions.GET_SERVICE_HEALTH_SUCCESS:
      return {
        ...state,
        services:{
          ...state.services,
          [action.meta.serviceName]:{
            ...state.services[action.meta.serviceName],
            serviceInstances: action.payload.length,
            status: action.payload.map(serviceInstance => serviceInstance.Status)
          }
        }
      };
    default:
      return state;
  }
};

export default consulReducer;


const getSelector = (state) => state.consul;

export const getServices = (state) => {
    const consul = getSelector(state)
    const consulSvcKeys = Object.keys(consul.services)
    const consulSvcList = consulSvcKeys.map(key => consul.services[key])
    return consulSvcList;
}