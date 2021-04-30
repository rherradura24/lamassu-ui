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

export default casReducer;