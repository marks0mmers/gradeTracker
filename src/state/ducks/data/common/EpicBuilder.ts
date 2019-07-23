import { Action, ActionCreator, AnyAction } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { empty, Observable, of } from "rxjs";
import { AjaxResponse } from "rxjs/internal-compatibility";
import { ajax } from "rxjs/observable/dom/ajax";
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
    requestHeadersNoAuth: {},
    requestBody?: (action: IA, state: RootState) => {},
) => {
    return (
        action$: Observable<IA>,
        state$: StateObservable<RootState>,
    ): Observable<AnyAction> => {
        return action$.pipe(
            ofType(type),
            mergeMap((action: IA) => {
                let ajaxCall: Observable<AjaxResponse> = empty();
                const token = sessionStorage.getItem("jwtToken");
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
                    map((res: AjaxResponse) => {
                        return res.response;
                    }),
                    mergeMap((data: ResData) => {
                        return of(endActionCreator(data));
                    }),
                    catchError((err: Error) => {
                        Toast.error(err.message);
                        return of(failActionCreator(err));
                    }),
                );
            }),
        );
    };
};
