import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import { ofType, StateObservable } from "redux-observable";
import { empty, Observable } from "rxjs";
import "rxjs/add/observable/of";
import { mergeMap } from "rxjs/operators";
import { GetCoursesCurrentUserCreator } from "src/state/ducks/data/courses";
import { RootState } from "src/state/rootReducer";

export const FetchGradesOnLoginEpic = (
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
