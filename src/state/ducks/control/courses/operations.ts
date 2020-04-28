import { LOCATION_CHANGE, LocationChangeAction, push } from "connected-react-router";
import { combineEpics, ofType, StateObservable } from "redux-observable";
import { empty, Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { Course } from "../../../../models/Course";
import { CourseDataActionTypes, GetCoursesCurrentUserSuccess } from "../../../../state/ducks/data/courses";
import { RootState } from "../../../rootReducer";
import { GetCoursesCurrentUserCreator } from "../../data/courses/actions/GetCoursesCurrentUser";
import { CourseControlActionTypes as types, SetActiveCourse, SetActiveCourseCreator } from ".";

const ChangeRouteOnCoursesLoadEpic = (
    action$: Observable<GetCoursesCurrentUserSuccess>,
) => action$.pipe(
    ofType(CourseDataActionTypes.GET_COURSES_CURRENT_USER_SUCCESS),
    mergeMap((action: GetCoursesCurrentUserSuccess) => {
        const courseFromRoute = action.courses.find((c: Course) => decodeURI(window.location.href).includes(c.title));
        if (courseFromRoute) {
            return of(SetActiveCourseCreator(new Course(courseFromRoute)));
        } else {
            return empty();
        }
    }),
);

const FetchGradesOnLoginEpic = (
    action$: Observable<LocationChangeAction>,
    state$: StateObservable<RootState>,
) => action$.pipe(
    ofType(LOCATION_CHANGE),
    mergeMap((action) => action.payload.location.pathname === "/" && state$.value.data.user.currentUser
        ? of(GetCoursesCurrentUserCreator())
        : empty(),
    ),
);

const PushRouteOnActiveCourseEpic = (
    action$: Observable<SetActiveCourse>,
) => {
    return action$.pipe(
        ofType(types.SET_ACTIVE_COURSE),
        mergeMap((action) => of(push(`/course/${action.course && action.course.title}`))),
    );
};

export const CourseControlEpics = combineEpics(
    PushRouteOnActiveCourseEpic,
    ChangeRouteOnCoursesLoadEpic,
    FetchGradesOnLoginEpic,
);
