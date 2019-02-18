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
    CreateNewUser,
    CreateNewUserSuccessCreator,
    UserDataActionTypes as types,
    UserFailureActionCreator,
} from "../actions";

// tslint:disable:no-any
export const CreateNewUserEpic = (
    action$: Observable<CreateNewUser>,
    state$: StateObservable<RootState>,
): Observable<AnyAction> => {
    return action$.pipe(
        ofType(types.CREATE_NEW_USER),
        mergeMap((action: CreateNewUser) => {
            return ajax.post(
                buildURL("/api/users"),
                action.user.toJS(),
                generateHeaders(),
            ).pipe(
                map((res: AjaxResponse) => {
                    return res.response;
                }),
                mergeMap((user: User) => {
                    return Observable.of(CreateNewUserSuccessCreator(user));
                }),
                catchError((err: Error) => {
                    Toast.error(err.message);
                    return Observable.of(UserFailureActionCreator(err));
                }),
            );
        }),
    );
};
