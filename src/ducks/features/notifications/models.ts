export class Notification {
    public message!: string
    public type!: NotificationType
    public timestamp!: Date

    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export const ONotificationType = {
    Info: "INFO",
    Success: "SUCCESS",
    Warn: "WARN",
    Error: "ERROR"
};

export type NotificationType = typeof ONotificationType[keyof typeof ONotificationType];
