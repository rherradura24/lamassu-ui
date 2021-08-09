import * as actions from "./ActionTypes"

const dmsReducer = (state = { list: {}, thiry_days_list:{}}, action) => {
  console.log(action);
  switch (action.type) {
    case actions.GET_ALL_DEVICES_SUCCESS:
      var currentList = {}
      action.payload.forEach(dev => {
        currentList[dev.id] = { ...dev, logs: [] }
      });
      return { ...state, list: currentList };

    case actions.GET_DEVICE_SUCCESS:
      var currentList = state.list
      currentList[action.payload.id] = { ...action.payload, logs: [] }
      return { ...state, list: currentList };

    case actions.GET_DEVICE_LOGS_SUCCESS:
      var currentList = state.list
      currentList[action.meta.id] = { ...state.list[action.meta.id], logs: action.payload }
      return { ...state, list: currentList };
    
    case actions.GET_DEVICE_DMSs_SUCCESS:
      var currentList = state.list
      const devicesKeys = Object.keys(currentList)
      const devicesList = devicesKeys.map(key => currentList[key])
      var dmsMap = {}
      var dmsIds = []
      
      action.payload.forEach(dms => {        
        dmsIds.push(dms.id)
        dmsMap[dms.id]=dms.dms_name
      });

      for (let i = 0; i < devicesList.length; i++) {
        const devItem = devicesList[i];
        if(dmsIds.includes(devItem.dms_id)){
          currentList[devItem.id].dms_name = dmsMap[devItem.dms_id]
          currentList[devItem.id].dms = currentList[devItem.id].dms_name + "#" + currentList[devItem.id].dms_id
        }
      }
      return {...state, list: currentList}

    case actions.GET_DEVICE_LAST_ISSUED_CERT_SUCCESS: 
      return {
        ...state, 
        list:{
          ...state.list,
          [action.meta.id]: {
            ...state.list[action.meta.id],
            cert: action.payload
          }
        }
      }

    case actions.GET_DEVICE_CERT_HISTORY_SUCCESS: 
      return {
        ...state, 
        list:{
          ...state.list,
          [action.meta.id]: {
            ...state.list[action.meta.id],
            certHistory: action.payload
          }
        }
      }

    case actions.GET_DMS_CERT_HISTORY_LAST_30_DAYS_SUCCESS: 

      if (action.payload != null){
        var currentList = {}
        action.payload.forEach(dms => {
          currentList[dms.dms_id] = {dms}
        });
  
        return { ...state, thiry_days_list: currentList };
      }else{
        return state
      }

    default:
      return state;
  }
};

export default dmsReducer;


const getSelector = (state) => state.devices;

export const getDevices = (state) => {
  const devicesReducer = getSelector(state)
  const devicesKeys = Object.keys(devicesReducer.list)
  const devicesList = devicesKeys.map(key => devicesReducer.list[key])
  return devicesList;
}

export const getIssuedCertsByDmsLastThirtyDays = (state) => {
  const devicesReducer = getSelector(state)
  const dmsKeys = Object.keys(devicesReducer.thiry_days_list)
  const dmsList = dmsKeys.map(key => devicesReducer.thiry_days_list[key])
  return dmsList;
}

