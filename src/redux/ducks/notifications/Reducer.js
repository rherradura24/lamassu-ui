import * as t from "./ActionTypes"


const initState = {
    list: {}
}

export const reducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case t.ADD_NOTIFICATION:
            var currentList = state.list
            const now = Date.now()
            currentList[now] = {
                timestamp: now,
                message: action.payload.message,
                type: action.payload.type
            }

            
            return {...state, list: currentList };
        default:
            return state;
    }
}

const getSelector = (state) => state.notifications

export const getNotificationList = (state) => {
    const notificationsState = getSelector(state)
    const notificationsKeys = Object.keys(notificationsState.list)
    const notificationsList = notificationsKeys.map(key => notificationsState.list[key])
    const sortedNotifications = notificationsList.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0))
    return sortedNotifications;
}