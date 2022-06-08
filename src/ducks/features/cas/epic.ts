import { Epic } from "redux-observable";
import { RootState } from "../../reducers";
import * as actions from "./actions";
import * as cloudProxyActions from "ducks/features/cloud-proxy/actions";
import { filter, exhaustMap, catchError, map } from "rxjs/operators";
import { from, of, tap, mergeMap, forkJoin, defaultIfEmpty } from "rxjs";

import * as apicalls from "./apicalls";
import * as cloudProxyApicalls from "ducks/features/cloud-proxy/apicalls";
import { isActionOf, PayloadAction } from "typesafe-actions";
import { RootAction } from "ducks/actions";

export const getCAsEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getCAsAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action) =>
            from(apicalls.getCAs()).pipe(
                map(actions.getCAsAction.success),
                catchError((message) => of(actions.getCAsAction.failure(message)))
            )
        )
    );
export const getStatsEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getStatsAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#399999; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action) =>
            from(apicalls.getStats()).pipe(
                map(actions.getStatsAction.success),
                catchError((message) => of(actions.getStatsAction.failure(message)))
            )
        )
    );

export const getIssuedCertsEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.getIssuedCertsActions.request)),
        tap((item: any) => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.GetIssuedCerts>) =>
            from(apicalls.getIssuedCerts(action.payload.caName, action.payload.offset, action.payload.page)).pipe(
                tap((item: any) => console.log("%c Epic ", "background:#25ee32; border-radius:5px;font-weight: bold;", "", item)),
                mergeMap(successAction => of(actions.getIssuedCertsActions.success(successAction, { ...action.payload }))),
                tap((item: any) => console.log("%c Epic ", "background:#ff1477; border-radius:5px;font-weight: bold;", "", item)),
                catchError((message) => of(actions.getIssuedCertsActions.failure(message)))
            )
        )
    );

export const importCAEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.importCAAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.ImportCA>) =>
            forkJoin(
                action.payload.selectedConnectorIDs.map(cloudConnectorID => cloudProxyApicalls.synchronizeCloudConnectors(cloudConnectorID, action.payload.caName))
            ).pipe(
                defaultIfEmpty({}),
                tap((item: any) => console.log("%c Epic ", "background:#25ee32; border-radius:5px;font-weight: bold;", "", item)),
                mergeMap(successAction => {
                    console.log(successAction); return of(cloudProxyActions.synchronizeCloudConnectorAction.success()).pipe(
                        tap((item: any) => console.log("%c Epic ", "background:#888001; border-radius:5px;font-weight: bold;", "", item)),
                        exhaustMap((action2) =>
                            from(apicalls.importCA(action.payload.caName, action.payload.enroller_ttl, action.payload.certificateB64, action.payload.privatekeyB64)).pipe(
                                tap((item: any) => console.log("%c Epic ", "background:#A198A1; border-radius:5px;font-weight: bold;", "", item)),
                                map(actions.importCAAction.success),
                                tap((item: any) => console.log("%c Epic ", "background:#F32111; border-radius:5px;font-weight: bold;", "", item)),
                                catchError((message) => { console.log(message); return of(actions.importCAAction.failure(message)); })
                            )
                        )
                    );
                })
            )
        )
    );

export const createCAEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.createCAAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.CreateCA>) =>
            forkJoin(
                action.payload.selectedConnectorIDs.map(cloudConnectorID => cloudProxyApicalls.synchronizeCloudConnectors(cloudConnectorID, action.payload.caName))
            ).pipe(
                defaultIfEmpty({}),
                tap((item: any) => console.log("%c Epic ", "background:#25ee32; border-radius:5px;font-weight: bold;", "", item)),
                mergeMap(successAction => {
                    console.log(successAction); return of(cloudProxyActions.synchronizeCloudConnectorAction.success()).pipe(
                        tap((item: any) => console.log("%c Epic ", "background:#888001; border-radius:5px;font-weight: bold;", "", item)),
                        exhaustMap((action2) =>
                            from(apicalls.createCA(action.payload.caName, action.payload.body)).pipe(
                                tap((item: any) => console.log("%c Epic ", "background:#A198A1; border-radius:5px;font-weight: bold;", "", item)),
                                map(actions.createCAAction.success),
                                tap((item: any) => console.log("%c Epic ", "background:#F32111; border-radius:5px;font-weight: bold;", "", item)),
                                catchError((message) => { console.log(message); return of(actions.createCAAction.failure(message)); })
                            )
                        )
                    );
                })
            )
        )
    );

export const revokeCAEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.revokeCAAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.RevokeCA>) =>
            from(apicalls.revokeCA(action.payload.caName)).pipe(
                tap((item: any) => console.log("%c Epic ", "background:#25ee32; border-radius:5px;font-weight: bold;", "", item)),
                mergeMap(successAction => of(actions.revokeCAAction.success(successAction, { ...action.payload }))),
                tap((item: any) => console.log("%c Epic ", "background:#ff1477; border-radius:5px;font-weight: bold;", "", item)),
                catchError((message) => of(actions.revokeCAAction.failure(message)))
            )
        )
    );

export const revokeCertEpic: Epic<RootAction, RootAction, RootState, {}> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(actions.revokeCertAction.request)),
        tap((item: any) => console.log("%c Epic ", "background:#8500ff; border-radius:5px;font-weight: bold;", "", item)),
        exhaustMap((action: PayloadAction<string, actions.RevokeCert>) =>
            from(apicalls.revokeCertificate(action.payload.caName, action.payload.serialNumber)).pipe(
                tap((item: any) => console.log("%c Epic ", "background:#25ee32; border-radius:5px;font-weight: bold;", "", item)),
                mergeMap(successAction => of(actions.revokeCertAction.success(successAction, { ...action.payload }))),
                tap((item: any) => console.log("%c Epic ", "background:#ff1477; border-radius:5px;font-weight: bold;", "", item)),
                catchError((message) => of(actions.revokeCertAction.failure(message)))
            )
        )
    );
