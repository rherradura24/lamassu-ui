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

