import { combineReducers } from "redux";
import { certificateAuthoritiesReducer, CertificateAuthoritiesState } from "./features/cas/reducer";
import { cloudProxyReducer, CloudProxyState } from "./features/cloud-proxy/reducer";
import { devicesReducer, DevicesState } from "./features/devices/reducer";
import { dmsReducer, DeviceManufacturingSystemStatus } from "./features/dms-enroller/reducer";
import { notificationsReducer, NotificationsState } from "./features/notifications/reducer";

export type RootState = {
  cas: CertificateAuthoritiesState,
  cloudproxy: CloudProxyState,
  devices: DevicesState,
  notifications: NotificationsState,
  dmss: DeviceManufacturingSystemStatus
}

const reducers = combineReducers({
    cas: certificateAuthoritiesReducer,
    notifications: notificationsReducer,
    cloudproxy: cloudProxyReducer,
    devices: devicesReducer,
    dmss: dmsReducer
});

export default reducers;
