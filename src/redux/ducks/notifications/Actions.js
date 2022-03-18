import * as t from "./ActionTypes"

export const addNotification = (notificationType, message) => {
  return {
    type: t.ADD_NOTIFICATION,
    payload: {
      type: notificationType,
      message: message
    }
  }
}
