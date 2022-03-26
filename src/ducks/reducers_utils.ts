
export const ORequestStatus = {
    Idle: "Idle",
    Pending: "Pending",
    Success: "Success",
    Failed: "Failed"
};

export const ORequestType = {
    None: "None",
    Read: "Read",
    Create: "Create",
    Update: "Update",
    Delete: "Delete"
};

export type RequestStatus = typeof ORequestStatus[keyof typeof ORequestStatus];
export type RequestType = typeof ORequestType[keyof typeof ORequestType];

export interface ActionStatus {
    isLoading: boolean
    status: RequestStatus
    type: RequestType
}

export function capitalizeFirstLetter (string: string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}
