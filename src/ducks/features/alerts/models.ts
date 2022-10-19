export class AlertsInfo {
    public build_version!: string
    public build_time!: string
    constructor (args?: {}) {
        Object.assign(this, args);
    }
}

export class CloudEvent {
    public specversion!: string
    public id!: string
    public source!: string
    public type!: string
    public datacontenttype!: string
    public time!: string
    public data!: string
}

export class Subscription {
    public id!: string
    public event_type!: string
    public subscription_date!: number
    public user_id!: string
    public conditions!: Array<string>
    public channel!: Channel
}
export class Channel {
    public type!: "email" | "webhook" | "msteams"
    public name!: string
    public config!: any
}

export class UserSubscription {
    public subscriptions!: Array<Subscription>
}
