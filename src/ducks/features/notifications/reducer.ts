/* eslint-disable prefer-const */
import { actionTypes } from "./actions";
import { Action } from "redux-actions";
import { Notification } from "./models";
import { RootState } from "ducks/reducers";

export interface NotificationsState {
    list: Array<Notification>
}

const initialState = {
    list: []
};

export const notificationsReducer = (
    state: NotificationsState = initialState,
    action: Action<any>
): NotificationsState => {
    switch (action.type) {
    case actionTypes.ADD_NOTIFICATION: {
        let notifications = state.list;
        notifications.push(new Notification({ type: action.payload.type, message: action.payload.type, timestamp: new Date() }));
        return { ...state, list: notifications };
    }

    default:
        return state;
    }
};

const getSelector = (state: RootState): NotificationsState => state.notifications;

export const getNotificationList = (state: RootState): Array<Notification> => {
    const notificationsState = getSelector(state);
    const sortedNotifications = notificationsState.list.sort((a: Notification, b: Notification) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0));

    return sortedNotifications;
};
