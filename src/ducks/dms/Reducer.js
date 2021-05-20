import * as actions from "./ActionTypes"

const dmsReducer = (state = { list: {} }, action) => {
  switch (action.type) {
    case actions.GET_ALL_DMS_SUCCESS:
      var currentList = state.list
      action.payload.forEach(dms => {
        currentList[dms.name] = dms
      });
      return { list: currentList, ...state };

    default:
      return state;
  }
};

export default dmsReducer;


const getSelector = (state) => state.dms;

export const getAllDMS = (state) => {
    const dms = getSelector(state)
    const dmsKeys = Object.keys(dms.list)
    const dmsList = dmsKeys.map(key => dms.list[key])
    return dmsList;
}