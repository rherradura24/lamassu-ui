import { success } from "redux/utils";
import * as t from "./ActionTypes"
import { statusToColor } from "./utils";

function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}  

const initState = {
    loading: false,
    loaded: false,
    list: {}
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case success(t.GET_DMS_LIST):
            var currentList = {}

            action.payload.forEach(dms => {
                dms.status = capitalizeFirstLetter(dms.status)
                dms.status_color = statusToColor(dms.status)
                currentList[dms.id] = dms
            });

            return {...state, list: currentList };
        default:
            return state;
    }
}

const getSelector = (state) => state.dmsenroller

export const getDmsList = (state) => {
    const dmsEnrollerState = getSelector(state)
    const dmsKeys = Object.keys(dmsEnrollerState.list)
    const dmsList = dmsKeys.map(key => dmsEnrollerState.list[key])
    return dmsList;
}