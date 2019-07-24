import { List, Map } from "immutable";
import { ofType } from "redux-observable";
import { empty, Observable, of } from "rxjs";
import { ajax } from "rxjs/observable/dom/ajax";
import { mergeMap } from "rxjs/operators";
import { Course } from "../../../../models/Course";
import { GradeCategory } from "../../../../models/GradeCategory";
import { generateHeaders } from "../../../../util/GenerateHeaders";
import { SetCoursesForUserCreator } from "../../data/courses/actions/SetCoursesForUser";
import { SetGradeCategoriesForUserCreator } from "../../data/gradeCategories/actions/SetGradeCategoriesForUser";
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const headers: any = generateHeaders();
        headers.Authorization = `Bearer ${sessionStorage.getItem("jwtToken")}`;
        return ajax.getJSON<Data>(
            `/api/courses/user/${action.userId}`,
            headers,
        ).pipe(
            mergeMap((data?: Data) => {
                const courses = data && List(data.courses).reduce(
                    (m: Map<string, Course>, c: Course) => m.set(c.id || "", new Course(c)),
                    Map(),
                );
                const categories = data && List(data.categories).reduce(
                    (m: Map<string, GradeCategory>, g: GradeCategory) => m.set(g.id, new GradeCategory(g)),
                    Map(),
                );
                if (!courses || !categories) {
                    return empty();
                }
                return of(
                    SetCoursesForUserCreator(courses),
                    SetGradeCategoriesForUserCreator(categories),
                );
            }),
        );
    }),
);
