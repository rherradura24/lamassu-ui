
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
    if (string === undefined) {
        return string;
    }
    string = string.toLowerCase();
    const splited = string.split("_");
    for (let i = 0; i < splited.length; i++) {
        splited[i] = splited[i].charAt(0).toUpperCase() + splited[i].slice(1);
    }
    return splited.join(" ");
}

export function uncamelize (str: string) {
    // Assume default separator is a single space.
    const separator = " ";

    // Replace all capital letters by separator followed by lowercase one
    str = str.replace(/[A-Z]/g, function (letter) {
        return separator + letter.toLowerCase();
    });
    // Remove first separator
    return str.replace("/^" + separator + "/", "");
}
