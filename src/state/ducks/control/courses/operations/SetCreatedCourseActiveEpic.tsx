import { AnyAction } from "redux";
import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import { mergeMap } from "rxjs/operators";
import { CourseDataActionTypes, CreateCourse } from "../../../data/courses";
import { SetActiveCourseCreator } from "../actions";

export const SetCreatedCourseActiveEpic = (
    action$: Observable<AnyAction>,
): Observable<AnyAction> => {
    return action$.pipe(
        ofType<CreateCourse>(
            CourseDataActionTypes.CREATE_COURSE,
        ),
        mergeMap((action: CreateCourse) => {
            return Observable.of(SetActiveCourseCreator(action.course.title));
        }),
    );
};
