import { List, Map } from "immutable";
import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { ajax } from "rxjs/internal-compatibility";
import { mergeMap } from "rxjs/operators";
import { Course } from "../../../../models/Course";
import { GradeCategory } from "../../../../models/GradeCategory";
import { SetCoursesForUserCreator } from "../courses/actions/SetCoursesForUser";
import { SetGradeCategoriesForUserCreator } from "../gradeCategories/actions/SetGradeCategoriesForUser";
import { ViewAnalysisForUser } from "./actions";
import { AnalysisControlActionTypes as types } from "./types";

interface Data {
    courses: Course[];
    categories: GradeCategory[];
}

export const GetAnalysisInformationForUserEpic = (
    action$: Observable<ViewAnalysisForUser>,
) => action$.pipe(
    ofType<ViewAnalysisForUser>(types.VIEW_ANALYSIS_FOR_USER),
    mergeMap(action => {
        const headers = {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
        };
        return ajax.getJSON<Data>(
            `/api/courses/user/${action.userId}`,
            headers,
        ).pipe(
            mergeMap((data?: Data) => {
                const courses = List(data?.courses ?? []).reduce(
                    (m, c) => m.set(c.id ?? "", new Course(c)),
                    Map<string, Course>(),
                );
                const categories = List(data?.categories ?? []).reduce(
                    (m, g) => m.set(g.id, new GradeCategory(g)),
                    Map<string, GradeCategory>(),
                );
                return of(
                    SetCoursesForUserCreator(courses),
                    SetGradeCategoriesForUserCreator(categories),
                );
            }),
        );
    }),
);
