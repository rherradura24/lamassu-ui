import * as cloudProxyReducer from "./Reducer";
import * as cloudProxyEpic from "./Epic";
import * as cloudProxyActions from "./Actions";
import * as cloudProxyActionTypes from "./ActionTypes";
import * as cloudProxyApiCalls from "./ApiCalls";

export default {
    reducer: cloudProxyReducer,
    epic: cloudProxyEpic,
    actions: cloudProxyActions,
    actionTypes: cloudProxyActionTypes,
    apiCalls: cloudProxyApiCalls
}