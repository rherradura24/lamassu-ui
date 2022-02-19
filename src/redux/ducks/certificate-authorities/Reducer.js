import { success } from "redux/utils";
import * as t from "./ActionTypes"
import { keyStrengthToColor, statusToColor } from "./utils";

function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}  

const initState = {
    loading: false,
    loaded: false,
    list: {}
}

export default (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case success(t.GET_CAS):
            var currentList = {}

            action.payload.forEach(ca => {
                // Standarize Strings
                ca.status = capitalizeFirstLetter(ca.status)
                ca.key_metadata.strength = capitalizeFirstLetter(ca.key_metadata.strength)

                ca.status_color = statusToColor(ca.status)
                ca.key_metadata.strength_color = keyStrengthToColor(ca.key_metadata.strength)
                currentList[ca.name] = ca
            });

            return {...state, list: currentList };
        default:
            return state;
    }
}

const getSelector = (state) => state.cas


export const getCAs = (state) => {
    const certs = getSelector(state)
    const certsKeys = Object.keys(certs.list)
    const certList = certsKeys.map(key => certs.list[key])
    return certList;
}