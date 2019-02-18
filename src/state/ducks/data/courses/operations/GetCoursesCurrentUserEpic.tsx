import { List, Map } from "immutable";
import { ofType, StateObservable } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import { AjaxResponse } from "rxjs/internal-compatibility";
import { ajax } from "rxjs/observable/dom/ajax";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Course } from "../../../../../models/Course";
import { generateAuthHeaders } from "../../../../../util/GenerateHeaders";
import { Toast } from "../../../../../util/Toast";
import { RootState } from "../../../../rootReducer";
import { CourseDataActionTypes as types, GetCoursesCurrentUser, GetCoursesCurrentUserSuccessCreator } from "../actions";
import { CourseFailureActionCreator } from "../actions/CourseFailureAction";

export const GetCoursesCurrentUserEpic = (
    action$: Observable<GetCoursesCurrentUser>,
    state$: StateObservable<RootState>,
) => {
    return action$.pipe(
        ofType(types.GET_COURSES_CURRENT_USER),
        mergeMap((action: GetCoursesCurrentUser) => {
            const { currentUser } = state$.value.data.user;
            return ajax.get(
                `/api/courses/user/${currentUser && currentUser.id}`,
                generateAuthHeaders(),
            ).pipe(
                map((res: AjaxResponse) => {
                    return res.response;
                }),
                mergeMap((courses: Course[]) => {
                    const courseMap: Map<string, Course> = List(courses)
                    .reduce((cs: Map<string, Course>, c: Course) => {
                        return c.id ? cs.set(c.id, c) : cs;
                    }, Map());
                    return Observable.of(GetCoursesCurrentUserSuccessCreator(courseMap));
                }),
                catchError((err: Error) => {
                    Toast.error(err.message);
                    return Observable.of(CourseFailureActionCreator(err));
                }),
            );
        }),
    );
};
