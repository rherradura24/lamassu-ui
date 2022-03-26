import { combineEpics } from "redux-observable";

import * as casEpic from "./features/cas/epic";

const combinedEpics = [
    ...Object.values(casEpic)
];

const epics = combineEpics(...combinedEpics);

export default epics;
