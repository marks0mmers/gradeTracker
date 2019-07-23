import { LOCATION_CHANGE, LocationChangeAction, push } from "connected-react-router";
import { combineEpics, ofType, StateObservable } from "redux-observable";
import { empty, Observable } from "rxjs";
import "rxjs/add/observable/of";
import { mergeMap } from "rxjs/operators";
import { CourseControlActionTypes as types, SetActiveCourse, SetActiveCourseCreator } from ".";
import { Course } from "../../../../models/Course";
import { CourseDataActionTypes, GetCoursesCurrentUserSuccess } from "../../../../state/ducks/data/courses";
import { RootState } from "../../../rootReducer";
import { GetCoursesCurrentUserCreator } from "../../data/courses/actions/GetCoursesCurrentUser";

const ChangeRouteOnCoursesLoadEpic = (
    action$: Observable<GetCoursesCurrentUserSuccess>,
) => action$.pipe(
    ofType(CourseDataActionTypes.GET_COURSES_CURRENT_USER_SUCCESS),
    mergeMap((action: GetCoursesCurrentUserSuccess) => {
        const courseFromRoute = action.courses.find((c: Course) => window.location.href.includes(c.title));
        if (courseFromRoute) {
            return Observable.of(SetActiveCourseCreator(new Course(courseFromRoute)));
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
    mergeMap((action: LocationChangeAction) => {
        if (action.payload.location.pathname === "/" && state$.value.data.user.currentUser) {
            return Observable.of(GetCoursesCurrentUserCreator());
        } else { return empty(); }
    }),
);

const PushRouteOnActiveCourseEpic = (
    action$: Observable<SetActiveCourse>,
) => {
    return action$.pipe(
        ofType(types.SET_ACTIVE_COURSE),
        mergeMap((action: SetActiveCourse) => {
            return Observable.of(push(`/course/${action.course && action.course.title}`));
        }),
    );
};

export const CourseControlEpics = combineEpics(
    PushRouteOnActiveCourseEpic,
    ChangeRouteOnCoursesLoadEpic,
    FetchGradesOnLoginEpic,
);
