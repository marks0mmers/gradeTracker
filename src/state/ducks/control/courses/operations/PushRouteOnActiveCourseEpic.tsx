import { push } from "connected-react-router";
import { ofType } from "redux-observable";
import { Observable } from "rxjs";
import "rxjs/add/observable/of";
import { mergeMap } from "rxjs/operators";
import { CourseControlActionTypes as types, SetActiveCourse } from "../actions";

export const PushRouteOnActiveCourseEpic = (
    action$: Observable<SetActiveCourse>,
) => {
    return action$.pipe(
        ofType(types.SET_ACTIVE_COURSE),
        mergeMap((action: SetActiveCourse) => {
            return Observable.of(push(`/${action.course && action.course.title}`));
        }),
    );
};
