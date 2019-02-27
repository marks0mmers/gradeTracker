import { Action, ActionCreator, AnyAction } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { empty, Observable } from "rxjs";
import "rxjs/add/observable/of";
import { AjaxResponse } from "rxjs/internal-compatibility";
import { ajax } from "rxjs/observable/dom/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { RootState } from "src/state/rootReducer";
import { Toast } from "src/util/Toast";

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
    requestHeaders: {},
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
                    mergeMap((data: ResData) => {
                        return Observable.of(endActionCreator(data));
                    }),
                    catchError((err: Error) => {
                        Toast.error(err.message);
                        return Observable.of(failActionCreator(err));
                    }),
                );
            }),
        );
    };
};
