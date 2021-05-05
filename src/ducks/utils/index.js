import { map } from 'rxjs/operators';
import { from as rxjsFrom } from 'rxjs';


export const PREFIX_SUCCESS = "_SUCCESS";
export const PREFIX_FAIL = "_ERROR";

const succeed = (actionType) => actionType + PREFIX_SUCCESS;
const failed = (actionType) => actionType + PREFIX_FAIL;

const makeRequestWithActions = (fetchPromise, actionType, meta={}) => 
    rxjsFrom(fetchPromise).pipe(
      map((data) => {
        if (data && !data.error) {
          return {
            type: succeed(actionType),
            payload: data,
            meta,
          };
        } else if (!data) {
          return {
            type: failed(actionType),
            payload: "undefined data",
            meta,
          };
        } else {
          return {
            type: failed(actionType),
            payload: "error ocurred",
            meta,
          };
        }
      }),
    )


export {makeRequestWithActions};