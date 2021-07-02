
import * as actions from "./ActionTypes"

const initialState = {
  list: {},
  error: null,
  loading: false
} 

const certsReducer = (state = initialState, action) => {
  if (actions.ERRORS.includes(action.type)) {
    return { ...state, error: action.payload }
  } else {
    switch (action.type) {
      case actions.GET_CAS_SUCCESS:
        var currentList = {}
        action.payload.forEach(ca => {
          currentList[ca.serial_number] = { ...ca, type: "CA" }
        });
        return {...state, list: currentList };
      
      case actions.GET_CERTS:
        return {...state,  loading: true };
        
      case actions.GET_CERTS_ERROR:
        return {...state,  loading: false };

      case actions.GET_CERTS_SUCCESS:
        var currentList = {}
        action.payload.forEach(ca => {
          currentList[ca.serial_number] = { ...ca, type: "END_CERT" }
        });
        return {...state, list: currentList, loading: false};

      default:
        return state;
    }
  }
};

const getSelector = (state) => state.certs

const getLoadingData = (state) => getSelector(state).loading

const getAllCerts = (state) => {
  const certs = getSelector(state)
  const certsKeys = Object.keys(certs.list)
  const certList = certsKeys.map(key => certs.list[key])
  return certList;
}

const getCAs = (state) => {
  const certs = getAllCerts(state)
  return certs.filter(cert=> cert.type == "CA");
}

const getIssuedCertByCA = (state, caName) => {
  const certs = getAllCerts(state)
  return certs.filter(cert=> cert.type == "END_CERT");
}

const getCertById = (state, id) => {
  const certs = getAllCerts(state)
  const result = certs.filter(cert=> cert.serial_number == id);
  return result.length > 0 ? result[0] : null
}


export default certsReducer;

export {
  getAllCerts,
  getIssuedCertByCA,
  getCertById,
  getCAs,
  getLoadingData,
}
