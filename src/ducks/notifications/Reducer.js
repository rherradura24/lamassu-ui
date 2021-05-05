import * as actions from "./ActionTypes"

const initialState = {
    lastUpdate: null,
    type: null, // error || success || info || warning
    msg: null
};

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.NOTIFY :
        return { ...state, lastUpdate: Date.now(), msg: action.payload.msg, type: action.payload.type };

        default:
        return state;
    }
};

export default notificationsReducer;

const getSelector = (state) => state.notifications

const getLastNotification = (state) => {
  return getSelector(state)
}

export {
    getLastNotification
}