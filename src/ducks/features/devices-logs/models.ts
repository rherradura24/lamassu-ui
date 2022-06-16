export class GetDeviceLogsResponse {
    public total_logs!: number
    public logs!: Array<DeviceLog>
}

export class DeviceLog {
    public id!: string
    public device_id!: string
    public log_message!: string
    public log_description!: string
    public log_type!: LogType
    public log_type_color!: string
    public timestamp!: Date
}

export const OLogType = {
    INFO: "INFO",
    SUCCESS: "SUCCESS",
    WARNING: "WARNING",
    CRITICAL: "CRITICAL"
};

export type LogType = typeof OLogType[keyof typeof OLogType];
