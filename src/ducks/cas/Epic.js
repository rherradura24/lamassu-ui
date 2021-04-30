import { ofType, from } from 'redux-observable';
import { filter, mapTo, mergeMap, map } from 'rxjs/operators';
import { from as rxjsFrom } from 'rxjs';
import * as actions from "./ActionTypes"
import * as notificationActions from "ducks/notifications/ActionTypes"

const fetchCas = () =>{
  const promise = new Promise((resolve, reject) =>{
    setTimeout(function(){
      resolve([
        {
          id: "1234",
          name: "haritz"
        },
        {
          id: "9999",
          name: "user9999"
        }
      ]); // ¡Todo salió bien!
    }, 3000);
  })
  return promise;
} 


const getCasEpic = action$ => action$.pipe(
  ofType(actions.GET_CAS),
  mergeMap(action =>
      rxjsFrom(fetchCas()).pipe(
          map(response => ({ type: actions.GET_CAS_SUCCESS, payload: response })
      ))  
  ),
);

const getCasSuccessEpic = action$ => action$.pipe(
  ofType(actions.GET_CAS_SUCCESS),
  mapTo({type: notificationActions.NOTIFY, payload: {msg: "Users fetched", severity: "info"}})
);

/*
const getUserEpic = action$ => action$.pipe(
  ofType(actions.GET_USER),
  mergeMap(action =>
      fetchUsers()
        .then(response => (
          map({ type: actions.GET_USER_SUCCESS, response, a: "1" })
      ))  
  ),
);
*/

export {
  getCasEpic,
  getCasSuccessEpic,
}
