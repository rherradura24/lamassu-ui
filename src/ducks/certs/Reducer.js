
import * as actions from "./ActionTypes"

const certsReducer = (state = { list: {} }, action) => {
  console.log(action);
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

const getCertById = (state, id) => {
  console.log("getCertById", id);
  const certs = getAllCerts(state)
  const result = certs.filter(cert=> cert.serial_number == id);
  return result.length > 0 ? result[0] : null
}


export default certsReducer;

export {
  getAllCerts,
  getCertById,
  getCAs,
}
