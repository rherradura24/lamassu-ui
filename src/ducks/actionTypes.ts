const PREFIX_SUCCESS = "_SUCCESS";
const PREFIX_FAIL = "_ERROR";

export const success = (actionType: string) => actionType + PREFIX_SUCCESS;
export const failed = (actionType: string) => actionType + PREFIX_FAIL;
