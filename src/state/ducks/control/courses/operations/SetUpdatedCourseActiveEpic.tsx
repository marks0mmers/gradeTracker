import { AnyAction } from "redux";
import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import { mergeMap } from "rxjs/operators";
import { CourseDataActionTypes, UpdateCourse } from "../../../data/courses";
import { SetActiveCourseCreator } from "../actions";

export const SetUpdatedCourseActiveEpic = (
    action$: Observable<AnyAction>,
): Observable<AnyAction> => {
    return action$.pipe(
        ofType<UpdateCourse>(
            CourseDataActionTypes.UPDATE_COURSE,
        ),
        mergeMap((action: UpdateCourse) => {
            return Observable.of(SetActiveCourseCreator(action.updatedCourse.title));
        }),
    );
};
