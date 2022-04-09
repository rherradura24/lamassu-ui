import { combineEpics } from "redux-observable";

import * as casEpic from "./features/cas/epic";
import * as cloudProxyEpic from "./features/cloud-proxy/epic";
import * as devicesEpic from "./features/devices/epic";
import * as dmsEpic from "./features/dms-enroller/epic";

const combinedEpics = [
    ...Object.values(casEpic),
    ...Object.values(cloudProxyEpic),
    ...Object.values(devicesEpic),
    ...Object.values(dmsEpic)
];

const epics = combineEpics(...combinedEpics);

export default epics;
