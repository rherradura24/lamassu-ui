import { map } from 'rxjs/operators';
import { from as rxjsFrom } from 'rxjs';

const PREFIX_SUCCESS = "_SUCCESS";
const PREFIX_FAIL = "_ERROR";

export const success = (actionType) => actionType + PREFIX_SUCCESS;
export const failed = (actionType) => actionType + PREFIX_FAIL;


export const makeRequestWithActions = (fetchPromise, actionType, meta={}) => 
  rxjsFrom(fetchPromise).pipe(
    map((data) => {
      console.log(data , !data.error);
      console.log(data && !data.error);
      if (data && !data.error) {
        return {
          type: success(actionType),
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
