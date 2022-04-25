/* eslint-disable prefer-const */
import { createReducer } from "typesafe-actions";
import { DMS } from "./models";
import { ActionStatus, capitalizeFirstLetter, ORequestStatus, ORequestType } from "ducks/reducers_utils";
import { RootState } from "ducks/reducers";
import { actions, RootAction } from "ducks/actions";
import { dmsStatusToColor } from "./utils";

export interface DeviceManufacturingSystemStatus {
    status: ActionStatus
    list: Array<DMS>,
    privateKey: string | undefined
}

const initialState = {
    status: {
        isLoading: false,
        status: ORequestStatus.Idle,
        type: ORequestType.None
    },
    list: [],
    privateKey: undefined
};

export const dmsReducer = createReducer<DeviceManufacturingSystemStatus, RootAction>(initialState)
    .handleAction(actions.dmsActions.getDMSListAction.request, (state, action) => {
        return { ...state, status: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read }, list: [] };
    })

    .handleAction(actions.dmsActions.getDMSListAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.dmsActions.getDMSListAction.success, (state, action) => {
        let dmss: Array<DMS> = action.payload;
        for (let i = 0; i < dmss.length; i++) {
            dmss[i].status = capitalizeFirstLetter(dmss[i].status);
            dmss[i].status_color = dmsStatusToColor(dmss[i].status);

            // dmss[i].key_metadata.strength = capitalizeFirstLetter(dmss[i].key_metadata.strength);
            // dmss[i].key_metadata.strength_color = keyStrengthToColor(dmss[i].key_metadata.strength);

            dmss[i].key_metadata.strength = "ToDo";
            dmss[i].key_metadata.strength_color = "red";
        }
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success }, list: dmss };
    })

    .handleAction(actions.dmsActions.approveDMSRequestAction.request, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Update } };
    })

    .handleAction(actions.dmsActions.approveDMSRequestAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    })
    .handleAction(actions.dmsActions.approveDMSRequestAction.success, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Success } };
    })

    .handleAction(actions.dmsActions.createDMSWithFormAction.request, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Create } };
    })

    .handleAction(actions.dmsActions.createDMSWithFormAction.failure, (state, action) => {
        return { ...state, status: { ...state.status, isLoading: false, status: ORequestStatus.Failed } };
    })
    .handleAction(actions.dmsActions.createDMSWithFormAction.success, (state, action) => {
        console.log(action);

        return { ...state, privateKey: action.payload.priv_key, status: { ...state.status, isLoading: false, status: ORequestStatus.Success } };
    });

const getSelector = (state: RootState): DeviceManufacturingSystemStatus => state.dmss;

export const getDMSs = (state: RootState): Array<DMS> => {
    const reducer = getSelector(state);
    return reducer.list;
};

export const getDMS = (state: RootState, id: string): DMS | undefined => {
    const reducer = getSelector(state);
    const filteredList = reducer.list.filter((dms: DMS) => dms.id === id);
    if (filteredList.length === 1) {
        return filteredList[0];
    }
    return undefined;
};

export const getRequestStatus = (state: RootState): ActionStatus => {
    const reducer = getSelector(state);
    return reducer.status;
};

export const getLastCreatedDMSPrivateKey = (state: RootState): string | undefined => {
    const reducer = getSelector(state);
    return reducer.privateKey;
};
