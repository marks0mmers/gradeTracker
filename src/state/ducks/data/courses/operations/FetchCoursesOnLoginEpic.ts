import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import { mergeMap } from "rxjs/operators";
import { GetCurrentUserSuccess, UserDataActionTypes } from "../../users";
import { GetCoursesCurrentUserCreator } from "../actions";

export const FetchCoursesOnLoginEpic = (
    action$: Observable<GetCurrentUserSuccess>,
) => {
    return action$.pipe(
        ofType(UserDataActionTypes.GET_CURRENT_USER_SUCCESS),
        mergeMap(() => {
            return Observable.of(GetCoursesCurrentUserCreator());
        }),
    );
};
