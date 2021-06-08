import * as actions from "./ActionTypes"

const dmsReducer = (state = { list: {}, lastPrivKey: null }, action) => {
  console.log(action);

  switch (action.type) {
    case actions.DELETE_LAST_PRIV_KEY:
      return { ...state, lastPrivKey: null };

    case actions.GET_ALL_DMS_SUCCESS:
      var currentList = {}
      action.payload.forEach(dms => {
        currentList[dms.id] = dms
      });

      return { ...state, list: currentList };

    case actions.CREATE_DMS_VIA_FORM_REQUEST_SUCCESS:
      return { ...state, lastPrivKey: {
        dms_id: action.payload.csr.id,
        dms_name: action.payload.csr.dms_name, 
        key: action.payload.priv_key
      } 
    };

    case actions.GET_DMS_CERT_SUCCESS:
      return{
        ...state,
        list: {
          ...state.list,
          [action.meta.dmsId]: {
            ...state.list[action.meta.dmsId],
            crt: action.payload
          }
        }
      }

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

export const getLastPrivKeyResponse = (state) => {
  const dms = getSelector(state)
  return dms.lastPrivKey
}