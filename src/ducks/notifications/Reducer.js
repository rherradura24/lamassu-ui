import * as actions from "./ActionTypes"

const initialState = {
    lastUpdate: null,
    type: null, // error || success || info || warning
    msg: null,
    history: []
};

const notificationsReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case actions.NOTIFY :
            var newHistory = state.history
            newHistory.push({
                msg: action.payload.msg,
                timestamp: Date.now(),
                type: action.payload.type
            })
            return { ...state, lastUpdate: Date.now(), msg: action.payload.msg, type: action.payload.type, history: newHistory };
        default:
            return state;
    }
};

export default notificationsReducer;

const getSelector = (state) => state.notifications

const getLastNotification = (state) => {
  return getSelector(state)
}

const getNotificationHistory = (state) => {
  return getSelector(state).history
}

export {
    getLastNotification,
    getNotificationHistory
}