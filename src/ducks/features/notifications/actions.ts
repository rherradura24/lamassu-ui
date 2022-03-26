import { createAction } from "redux-actions";

export const actionTypes = {
    ADD_NOTIFICATION: "ADD_NOTIFICATION"
};

export interface IAddNotification {
    messgae: string
    type: "INFO" | "SUCCESS" | "WARN" | "ERROR"
}
export const addNotificationAction = createAction<IAddNotification>(actionTypes.ADD_NOTIFICATION);
