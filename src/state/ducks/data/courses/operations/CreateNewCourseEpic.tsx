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
import { CourseDataActionTypes as types, CreateNewCourse, CreateNewCourseSuccessCreator } from "../actions";
import { CourseFailureActionCreator } from "../actions/CourseFailureAction";

export const CreateNewCourseEpic = (
    action$: Observable<CreateNewCourse>,
    state$: StateObservable<RootState>,
) => {
    return action$.pipe(
        ofType(types.CREATE_NEW_COURSE),
        mergeMap((action: CreateNewCourse) => {
            const { currentUser } = state$.value.data.user;
            if (currentUser) {
                const course = action.course.set("userId", currentUser._id);
                return ajax.post(
                    "/api/courses",
                    course.toJS(),
                    generateAuthHeaders(),
                ).pipe(
                    map((res: AjaxResponse) => {
                        return res.response;
                    }),
                    mergeMap((c: Course) => {
                        return Observable.of(CreateNewCourseSuccessCreator(c));
                    }),
                    catchError((err: Error) => {
                        Toast.error(err.message);
                        return Observable.of(CourseFailureActionCreator(err));
                    }),
                );
            } else {
                return Observable.of(CourseFailureActionCreator(new Error("User is not defined")));
            }
        }),
    );
};
