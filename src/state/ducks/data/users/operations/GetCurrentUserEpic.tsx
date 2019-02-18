import "rxjs/add/observable/of";
import { ajax, AjaxResponse } from "rxjs/internal-compatibility";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AnyAction } from "../../../../../../node_modules/redux";
import { ofType, StateObservable } from "../../../../../../node_modules/redux-observable";
import { Observable } from "../../../../../../node_modules/rxjs";
import { User } from "../../../../../models/User";
import { generateAuthHeaders } from "../../../../../util/GenerateHeaders";
import { Toast } from "../../../../../util/Toast";
import { RootState } from "../../../../rootReducer";
import {
    GetCurrentUser,
    GetCurrentUserSuccessCreator,
    UserDataActionTypes as types,
    UserFailureActionCreator,
} from "../actions";

export const GetCurrentUserEpic = (
    action$: Observable<GetCurrentUser>,
    state$: StateObservable<RootState>,
): Observable<AnyAction> => {
    return action$.pipe(
        ofType(types.GET_CURRENT_USER),
        mergeMap((action: GetCurrentUser) => {
            return ajax.get(
                "/api/users/current",
                generateAuthHeaders(),
            ).pipe(
                map((res: AjaxResponse) => {
                    if (res.response.token) {
                        sessionStorage.setItem("jwtToken", res.response.token);
                    }
                    res.response.token = undefined;
                    return res.response;
                }),
                mergeMap((user: User) => {
                    return Observable.of(GetCurrentUserSuccessCreator(user));
                }),
                catchError((err: Error) => {
                    Toast.error(err.message);
                    return Observable.of(UserFailureActionCreator(err));
                }),
            );
        }),
    );
};
