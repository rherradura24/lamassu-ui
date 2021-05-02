import * as actions from "./ActionTypes"

const casReducer = (state = { list: [] }, action) => {
  console.log(action);
  switch (action.type) {
    case actions.GET_CAS_SUCCESS:
      return { list: action.payload };

    default:
      return state;
  }
};

const getSelector = (state) => state.cas

const getCAs = (state) => {
  return getSelector(state).list
}

export default casReducer;

export {
  getCAs,
}