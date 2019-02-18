import { AnyAction } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import { ajax, AjaxResponse } from "rxjs/internal-compatibility";
import { catchError, map, mergeMap } from "rxjs/operators";
import { buildURL } from "src/util/BuildURL";
import { User } from "../../../../../models/User";
import { generateHeaders } from "../../../../../util/GenerateHeaders";
import { Toast } from "../../../../../util/Toast";
import { RootState } from "../../../../rootReducer";
import {
    Login,
    LoginSuccessCreator,
    UserDataActionTypes as types,
    UserFailureActionCreator,
} from "../actions";

export const LoginEpic = (
    action$: Observable<Login>,
    state$: StateObservable<RootState>,
): Observable<AnyAction> => {
    return action$.pipe(
        ofType(types.LOGIN),
        mergeMap((action: Login) => {
            return ajax.post(
                buildURL("/api/users/login"),
                action.user,
                generateHeaders(),
            ).pipe(
                map((res: AjaxResponse) => {
                    if (res.response.token) {
                        sessionStorage.setItem("jwtToken", res.response.token);
                    }
                    res.response.token = undefined;
                    return res.response;
                }),
                mergeMap((user: User) => {
                    return Observable.of(LoginSuccessCreator(user));
                }),
                catchError((err: Error) => {
                    Toast.error(err.message);
                    return Observable.of(UserFailureActionCreator(err));
                }),
            );
        }),
    );
};
