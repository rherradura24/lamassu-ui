
import * as actions from "./ActionTypes"

const initialState = {
  list: {},
  error: null
} 

const certsReducer = (state = initialState, action) => {
  if (actions.ERORS.includes(action.type)) {
    return { ...state, error: action.payload }
  } else {
    switch (action.type) {
      case actions.GET_CAS_SUCCESS:
        var currentList = state.list
        action.payload.forEach(ca => {
          currentList[ca.serial_number] = { ...ca, type: "CA" }
        });
        return { list: currentList, ...state };
      
      case actions.GET_CERTS_SUCCESS:
        var currentList = state.list
        action.payload.forEach(ca => {
          currentList[ca.serial_number] = { ...ca, type: "END_CERT" }
        });
        return { list: currentList, ...state };

      default:
        return state;
    }
  }
};

const getSelector = (state) => state.certs

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
}
