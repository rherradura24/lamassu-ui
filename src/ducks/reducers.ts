import { combineReducers } from "redux";
import { certificateAuthoritiesReducer, CertificateAuthoritiesState } from "./features/cas/reducer";
import { cloudProxyReducer, CloudProxyState } from "./features/cloud-proxy/reducer";
import { devicesLogsReducer, DevicesLogsState } from "./features/devices-logs/reducer";
import { devicesReducer, DevicesState } from "./features/devices/reducer";
import { dmsReducer, DeviceManufacturingSystemStatus } from "./features/dms-enroller/reducer";
import { eventsReducer, EventsState } from "./features/events/reducer";
import { notificationsReducer, NotificationsState } from "./features/notifications/reducer";

export type RootState = {
  cas: CertificateAuthoritiesState,
  cloudproxy: CloudProxyState,
  devices: DevicesState,
  devicesLogs: DevicesLogsState,
  notifications: NotificationsState,
  dmss: DeviceManufacturingSystemStatus
  events: EventsState
}

const reducers = combineReducers({
    cas: certificateAuthoritiesReducer,
    notifications: notificationsReducer,
    cloudproxy: cloudProxyReducer,
    devices: devicesReducer,
    devicesLogs: devicesLogsReducer,
    dmss: dmsReducer,
    events: eventsReducer
});

export default reducers;
