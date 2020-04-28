import { AnyAction } from "redux";
import { ofType, StateObservable } from "redux-observable";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { RootState } from "../../../../../state/rootReducer";
import { GetGradeCategoryForCourseCreator, GradeCategoryDataActionTypes as types } from "../actions";

export const FetchCategoriesOnGradeChangeEpic = (
    action$: Observable<AnyAction>,
    state$: StateObservable<RootState>,
) => action$.pipe(
    ofType(types.CREATE_GRADE_SUCCESS, types.EDIT_GRADE_SUCCESS, types.DELETE_GRADE_SUCCESS),
    mergeMap(() => {
        const { activeCourse } = state$.value.control.course;
        return of(GetGradeCategoryForCourseCreator((activeCourse && activeCourse.id) || ""));
    }),
);
