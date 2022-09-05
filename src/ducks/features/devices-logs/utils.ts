import { LogType, OLogType } from "./models";

export const logTypeToColor = (status: LogType) => {
    switch (status) {
    case OLogType.INFO:
        return "blue";
    case OLogType.SUCCESS:
        return "green";
    case OLogType.WARN:
        return "orange";
    case OLogType.CRITICAL:
        return "red";
    default:
        return "gray";
    }
};
