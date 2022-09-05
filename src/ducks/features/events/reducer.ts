/* eslint-disable prefer-const */
import { createReducer } from "typesafe-actions";
import { CloudEvent, UserSubscription } from "./models";
import { ActionStatus, ORequestStatus, ORequestType } from "ducks/reducers_utils";
import { RootState } from "ducks/reducers";
import { actions, RootAction } from "ducks/actions";

export interface EventsState {
    events: Array<CloudEvent>
    eventsStatus: ActionStatus
    subscription: UserSubscription
    subscriptionsStatus: ActionStatus

}

const initialState = {
    eventsStatus: {
        isLoading: false,
        status: ORequestStatus.Idle,
        type: ORequestType.None
    },
    subscriptionsStatus: {
        isLoading: false,
        status: ORequestStatus.Idle,
        type: ORequestType.None
    },
    events: [],
    subscription: {
        email: "",
        subscriptions: []
    }
};

export const eventsReducer = createReducer<EventsState, RootAction>(initialState)
    .handleAction(actions.eventsActions.getEvents.request, (state, action) => {
        return { ...state, eventsStatus: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read }, events: [] };
    })

    .handleAction(actions.eventsActions.getEvents.success, (state, action) => {
        return { ...state, eventsStatus: { ...state.eventsStatus, isLoading: false, status: ORequestStatus.Success }, events: action.payload };
    })

    .handleAction(actions.eventsActions.getEvents.failure, (state, action) => {
        return { ...state, eventsStatus: { ...state.eventsStatus, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.eventsActions.getSubscriptions.request, (state, action) => {
        return { ...state, subscriptionsStatus: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read }, subscription: { email: "", subscriptions: [] } };
    })

    .handleAction(actions.eventsActions.getSubscriptions.success, (state, action) => {
        return { ...state, subscriptionsStatus: { ...state.subscriptionsStatus, isLoading: false, status: ORequestStatus.Success }, subscription: action.payload };
    })

    .handleAction(actions.eventsActions.getSubscriptions.failure, (state, action) => {
        return { ...state, subscriptionsStatus: { ...state.subscriptionsStatus, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.eventsActions.subscribeAction.request, (state, action) => {
        return { ...state, subscriptionsStatus: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read } };
    })

    .handleAction(actions.eventsActions.subscribeAction.success, (state, action) => {
        return { ...state, subscriptionsStatus: { ...state.subscriptionsStatus, isLoading: false, status: ORequestStatus.Success } };
    })

    .handleAction(actions.eventsActions.subscribeAction.failure, (state, action) => {
        return { ...state, subscriptionsStatus: { ...state.subscriptionsStatus, isLoading: false, status: ORequestStatus.Failed } };
    })

    .handleAction(actions.eventsActions.unsubscribeAction.request, (state, action) => {
        return { ...state, subscriptionsStatus: { isLoading: true, status: ORequestStatus.Pending, type: ORequestType.Read } };
    })

    .handleAction(actions.eventsActions.unsubscribeAction.success, (state, action) => {
        return { ...state, subscriptionsStatus: { ...state.subscriptionsStatus, isLoading: false, status: ORequestStatus.Success } };
    })

    .handleAction(actions.eventsActions.unsubscribeAction.failure, (state, action) => {
        return { ...state, subscriptionsStatus: { ...state.subscriptionsStatus, isLoading: false, status: ORequestStatus.Failed } };
    });

const getSelector = (state: RootState): EventsState => state.events;

export const getEvents = (state: RootState): Array<CloudEvent> => {
    const reducer = getSelector(state);
    return reducer.events;
};

export const getEventRequestStatus = (state: RootState): ActionStatus => {
    const reducer = getSelector(state);
    return reducer.eventsStatus;
};

export const getSubscriptions = (state: RootState): UserSubscription => {
    const reducer = getSelector(state);
    return reducer.subscription;
};

export const getSubscriptionRequestStatus = (state: RootState): ActionStatus => {
    const reducer = getSelector(state);
    return reducer.subscriptionsStatus;
};
