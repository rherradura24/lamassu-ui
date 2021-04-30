import * as actions from "./ActionTypes"

const initialState = {
    displaying: false,
    type: "", // ERROR || SUCCESS
    msg: ""
};

const notificationsReducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actions.NOTIFY :
        return { ...state, displaying: true, msg: action.payload.msg, type: action.payload.severity };

        case actions.NOTIFY_SUCCESS:
        return { ...state, displaying: false };

        default:
        return state;
    }
};
export default notificationsReducer;