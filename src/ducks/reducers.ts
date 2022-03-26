import { combineReducers } from "redux";
import { certificateAuthoritiesReducer, CertificateAuthoritiesState } from "./features/cas/reducer";
import { notificationsReducer, NotificationsState } from "./features/notifications/reducer";

export type RootState = {
  cas: CertificateAuthoritiesState,
  notifications: NotificationsState
}

const reducers = combineReducers({
    cas: certificateAuthoritiesReducer,
    notifications: notificationsReducer
});

export default reducers;
