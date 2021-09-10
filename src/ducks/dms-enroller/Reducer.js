import { Certificate } from "@fidm/x509";
import moment from "moment";
import * as actions from "./ActionTypes"

const dmsReducer = (state = { list: {}, lastPrivKey: null }, action) => {
  console.log(action);

  switch (action.type) {
    case actions.DELETE_LAST_PRIV_KEY:
      return { ...state, lastPrivKey: null };

    case actions.GET_ALL_DMS_ENROLLER_SUCCESS:
      var currentList = {}
      action.payload.forEach(dms => {
        dms.lastIssued = "nan"
        currentList[dms.id] = dms
      });

      return { ...state, list: currentList };

    case actions.CREATE_DMS_ENROLLER_REQUEST_VIA_FORM_REQUEST_SUCCESS:
      return { ...state, lastPrivKey: {
        dms_id: action.payload.csr.id,
        dms_name: action.payload.csr.dms_name, 
        key: action.payload.priv_key
      } 
    };

    case actions.GET_DMS_ENROLLER_CERT_SUCCESS:
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
    
    case actions.GET_DMS_LAST_ISSUED_CERT_SUCCESS:
      var currentList = state.list;
      if (action.payload !== null) {
        for (let i = 0; i < action.payload.length; i++) {
          console.log(currentList, action.payload[i]);
          if (currentList[action.payload[i].dms_id]) {
            currentList[action.payload[i].dms_id].lastIssued = action.payload[i].timestamp
          }
        }
      }

      return{...state, list: currentList}

    default:
      return state;
  }
};

export default dmsReducer;


const getSelector = (state) => state.dmsEnroller;

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

export const getDMSsExpiringXDays = (state, daysToExpire) => {
  const dmss = getAllDMS(state)
  const result = dmss.filter(dms=> {
    if (dms.crt) {
      const cert = Certificate.fromPEM(dms.crt)
      return moment(cert.validTo).subtract(daysToExpire, "days").isBefore(moment())
    }
  });
  return result
}