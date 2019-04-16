import { ofType } from "redux-observable";
import { empty, Observable } from "rxjs";
import "rxjs/add/observable/of";
import { mergeMap } from "rxjs/operators";
import { Course } from "src/models/Course";
import { CourseDataActionTypes, GetCoursesCurrentUserSuccess } from "src/state/ducks/data/courses";
import { SetActiveCourseCreator } from "../actions";

export const ChangeRouteOnCoursesLoadEpic = (
    action$: Observable<GetCoursesCurrentUserSuccess>,
) => action$.pipe(
    ofType(CourseDataActionTypes.GET_COURSES_CURRENT_USER_SUCCESS),
    mergeMap((action: GetCoursesCurrentUserSuccess) => {
        const courseFromRoute = action.courses.find((c: Course) => location.href.includes(c.title));
        if (courseFromRoute) {
            return Observable.of(SetActiveCourseCreator(new Course(courseFromRoute)));
        } else {
            return empty();
        }
    }),
);
