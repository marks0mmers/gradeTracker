import { combineEpics, ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Course } from "../../../../models/Course";
import { CourseDataActionTypes, GetCoursesCurrentUserSuccess } from "../../../../state/ducks/data/courses";
import { SetActiveCourseCreator } from ".";

const ChangeRouteOnCoursesLoadEpic = (
    action$: Observable<GetCoursesCurrentUserSuccess>,
) => action$.pipe(
    ofType(CourseDataActionTypes.GET_COURSES_CURRENT_USER_SUCCESS),
    mergeMap((action: GetCoursesCurrentUserSuccess) => {
        const courseFromRoute = action.courses.find((c: Course) => decodeURI(window.location.href).includes(c.title));
        if (courseFromRoute) {
            return of(SetActiveCourseCreator(new Course(courseFromRoute)));
        } else {
            return of();
        }
    }),
);

export const CourseControlEpics = combineEpics(
    ChangeRouteOnCoursesLoadEpic,
);
