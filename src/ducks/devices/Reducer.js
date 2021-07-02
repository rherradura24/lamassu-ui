import * as actions from "./ActionTypes"

const dmsReducer = (state = { list: {}}, action) => {
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

