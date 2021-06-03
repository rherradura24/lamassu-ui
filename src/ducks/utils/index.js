import { map } from 'rxjs/operators';
import { from as rxjsFrom } from 'rxjs';


export const PREFIX_SUCCESS = "_SUCCESS";
export const PREFIX_FAIL = "_ERROR";

const succeed = (actionType) => actionType + PREFIX_SUCCESS;
const failed = (actionType) => actionType + PREFIX_FAIL;

const makeRequestWithActions = (fetchPromise, actionType, meta={}) => 
    rxjsFrom(fetchPromise).pipe(
      map((data) => {
        console.log(data , !data.error);
        if (data && !data.error) {
          return {
            type: succeed(actionType),
            payload: data.json,
            meta: meta,
          };
        } else {
          return {
            type: failed(actionType),
            payload: "Error: " + data.error,
            meta: meta,
          };
        }
      }),
    )


export {makeRequestWithActions};