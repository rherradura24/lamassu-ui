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
    public event_type!: string
    public subscription_date!: string
}

export class UserSubscription {
    public email!: string
    public subscriptions!: Array<Subscription>
}
