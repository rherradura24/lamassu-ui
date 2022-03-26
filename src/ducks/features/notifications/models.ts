export class Notification {
    public message!: string
    public type!: NotificationType
    public timestamp!: Date

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export const ONotificationType = {
    Info: "Info",
    Success: "Success",
    Warn: "Warn",
    Error: "Error"
};

export type NotificationType = typeof ONotificationType[keyof typeof ONotificationType];
