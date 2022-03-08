import { failed, success } from "redux/utils";
import { actionType, status } from "redux/utils/constants";
import * as t from "./ActionTypes"
import { keyStrengthToColor, statusToColor } from "./utils";

function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}  

const initState = {
    status: status.IDLE,
    actionType: actionType.NONE,
    list: {}
}

export const reducer = (state = initState, action) => {
    switch (action.type) {
        case t.GET_DMS_LIST:
            return {...state, status: status.PENDING, actionType: actionType.READ };
            
        case failed(t.GET_DMS_LIST):
            return {...state, status: status.FAILED };

        case success(t.GET_DMS_LIST):
            var currentList = {}

            action.payload.forEach(dms => {
                dms.status = capitalizeFirstLetter(dms.status)
                dms.status_color = statusToColor(dms.status)

                // dms.key_metadata.strength = capitalizeFirstLetter(dms.key_metadata.strength)
                // dms.key_metadata.strength_color = keyStrengthToColor(dms.key_metadata.strength)

                dms.key_metadata.strength = "ToDo"
                dms.key_metadata.strength_color = "red"
                
                currentList[dms.id] = dms
            });

            return {...state, list: currentList, status: status.SUCCEEDED };

        case t.CREATE_DMS:
            return {...state, status: status.PENDING, actionType: actionType.CREATE };
            
        case failed(t.CREATE_DMS):
            return {...state, status: status.FAILED };
            
        case success(t.CREATE_DMS):
            return {...state, status: status.SUCCEEDED };

        case t.UPDATE_STATUS:
            return {...state, status: status.PENDING, actionType: actionType.UPDATE };
            
        case failed(t.UPDATE_STATUS):
            return {...state, status: status.FAILED };
            
        case success(t.UPDATE_STATUS):
            return {...state, status: status.SUCCEEDED };
                
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