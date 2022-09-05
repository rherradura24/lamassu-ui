import { combineEpics } from "redux-observable";

import * as casEpic from "./features/cas/epic";
import * as cloudProxyEpic from "./features/cloud-proxy/epic";
import * as devicesEpic from "./features/devices/epic";
import * as devicesLogsEpic from "./features/devices-logs/epic";
import * as dmsEpic from "./features/dms-enroller/epic";
import * as eventsEpic from "./features/events/epic";

const combinedEpics = [
    ...Object.values(casEpic),
    ...Object.values(cloudProxyEpic),
    ...Object.values(devicesEpic),
    ...Object.values(devicesLogsEpic),
    ...Object.values(dmsEpic),
    ...Object.values(eventsEpic)
];

const epics = combineEpics(...combinedEpics);

export default epics;
