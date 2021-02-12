/* eslint-disable @typescript-eslint/no-explicit-any */
import { Action, ActionCreator, AnyAction } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { AjaxResponse, ajax } from "rxjs/internal-compatibility";
import { catchError, map, mergeMap } from "rxjs/operators";
import { RootState } from "../../../../state/rootReducer";
import { Toast } from "../../../../util/Toast";

export enum AjaxMethodType {
    GET,
    POST,
    PUT,
    DELETE,
}

export const epicBuilder = <
    IA extends Action,
    OA extends Action,
    OAC extends ActionCreator<OA>,
    FA extends Action,
    FAC extends ActionCreator<FA>,
    ResData
>(
    endActionCreator: OAC,
    failActionCreator: FAC,
    type: string,
    requestType: AjaxMethodType,
    routeBuilder: (action: IA, state: RootState) => string,
    requestHeadersNoAuth: any,
    requestBody?: (action: IA, state: RootState) => unknown,
) => (
    action$: Observable<IA>,
    state$: StateObservable<RootState>,
): Observable<AnyAction> => action$.pipe(
    ofType(type),
    mergeMap((action: IA) => {
        let ajaxCall: Observable<AjaxResponse> = of();
        const token = localStorage.getItem("jwtToken");
        const requestHeaders = token
            ? {
                ...requestHeadersNoAuth,
                Authorization: `Bearer ${token}`,
            }
            : requestHeadersNoAuth;
        switch (requestType) {
            case AjaxMethodType.GET:
                ajaxCall = ajax.get(
                    routeBuilder(action, state$.value),
                    requestHeaders,
                );
                break;
            case AjaxMethodType.POST:
                ajaxCall = ajax.post(
                    routeBuilder(action, state$.value),
                    requestBody && requestBody(action, state$.value),
                    requestHeaders,
                );
                break;
            case AjaxMethodType.PUT:
                ajaxCall = ajax.put(
                    routeBuilder(action, state$.value),
                    requestBody && requestBody(action, state$.value),
                    requestHeaders,
                );
                break;
            case AjaxMethodType.DELETE:
                ajaxCall = ajax.delete(
                    routeBuilder(action, state$.value),
                    requestHeaders,
                );
                break;
        }
        return ajaxCall.pipe(
            map((res: AjaxResponse) => res.response),
            mergeMap((data: ResData) => of(endActionCreator(data))),
            catchError((err: Error) => Toast.error(err.message) && of(failActionCreator(err))),
        );
    }),
);
