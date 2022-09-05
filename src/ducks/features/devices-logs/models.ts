export class GetDeviceLogsResponse {
    public logs!: Array<DeviceLog>
    public slot_logs!: any
}

export class DeviceLog {
    public log_message!: string
    public log_description!: string
    public log_type!: LogType
    public log_type_color!: string
    public timestamp!: Date
}

export const OLogType = {
    INFO: "INFO",
    SUCCESS: "SUCCESS",
    WARN: "WARN",
    CRITICAL: "CRITICAL"
};

export type LogType = typeof OLogType[keyof typeof OLogType];
