import { ActionType } from "typesafe-actions";

import * as caActions from "./features/cas/actions";
import * as cloudProxyActions from "./features/cloud-proxy/actions";
import * as devicesActions from "./features/devices/actions";
import * as dmsActions from "./features/dms-enroller/actions";
export const actions = {
    caActions,
    cloudProxyActions,
    devicesActions,
    dmsActions
};

export type CAsActions = ActionType<typeof caActions>;
export type CloudProxyActions = ActionType<typeof cloudProxyActions>;
export type DevicesActions = ActionType<typeof devicesActions>;
export type DMSActions = ActionType<typeof dmsActions>;

export type RootAction =
    | CAsActions
    | CloudProxyActions
    | DevicesActions
    | DMSActions
