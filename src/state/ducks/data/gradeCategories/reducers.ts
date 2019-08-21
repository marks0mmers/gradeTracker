import { List, Map, Record, RecordOf } from "immutable";
import { GradeCategory } from "../../../../models/GradeCategory";
import { GradeCategoryDataActions, GradeCategoryDataActionTypes as types } from "./actions";

interface IGradeCategoryDataState {
    gradeCategories: Map<string, GradeCategory>;
    gradeCategoriesForUser: Map<string, GradeCategory>;
}

export const GradeCategoryDataState = Record<IGradeCategoryDataState>({
    gradeCategories: Map(),
    gradeCategoriesForUser: Map(),
});

export type GradeCategoryDataState = RecordOf<IGradeCategoryDataState>;

export const GradeCategoryDataReducer = (
    state = new GradeCategoryDataState(),
    action: GradeCategoryDataActions,
): GradeCategoryDataState => {
    switch (action.type) {
        case (types.CREATE_GRADE_CATEGORY_SUCCESS):
            return state.setIn(
                ["gradeCategories", action.gradeCategory.id],
                new GradeCategory(action.gradeCategory).set("grades", List(action.gradeCategory.grades)),
            );
        case (types.GET_GRADE_CATEGORIES_FOR_COURSE_SUCCESS):
            return state.set("gradeCategories", List(action.gradeCategories)
                .map(gc => new GradeCategory(gc).set("grades", List(gc.grades)))
                .toMap()
                .mapKeys((_, gc) => gc.id)
                .toMap());
        case (types.GET_GRADE_CATEGORIES_FOR_CURRENT_USER_SUCCESS):
            return state.set("gradeCategories", List(action.gradeCategories)
                .map(gc => new GradeCategory(gc).set("grades", List(gc.grades)))
                .toMap()
                .mapKeys((_, gc) => gc.id)
                .toMap());
        case (types.EDIT_GRADE_CATEGORY_SUCCESS):
            return state.setIn(
                ["gradeCategories", action.category.id],
                new GradeCategory(action.category).set("grades", List(action.category.grades)),
            );
        case (types.DELETE_GRADE_CATEGORY_SUCCESS):
            return state.removeIn(["gradeCategories", action.category.id]);
        case (types.CREATE_GRADE_SUCCESS):
            return state.setIn(
                // -1 for the last spot in the list
                ["gradeCategories", action.grade.gradeCategoryId, "grades", -1],
                action.grade,
            );
        case (types.EDIT_GRADE_SUCCESS):
            const category1 = state.gradeCategories.get(action.grade.gradeCategoryId);
            const existingGrades = category1 && category1.grades;
            return existingGrades
                ? state.setIn([
                    "gradeCategories",
                    action.grade.gradeCategoryId,
                    "grades",
                    existingGrades.indexOf(action.grade),
                ], action.grade)
                : state;
        case (types.DELETE_GRADE_SUCCESS):
            const category2 = state.gradeCategories.get(action.grade.gradeCategoryId);
            const existingGrades2 = category2 && category2.grades;
            return existingGrades2
                ? state.removeIn([
                    "gradeCategories",
                    action.grade.gradeCategoryId,
                    "grades",
                    existingGrades2.indexOf(action.grade),
                ])
                : state;
        case (types.SET_GRADE_CATEGORIES_FOR_USER):
            return state.set("gradeCategoriesForUser", action.categories);
        default:
            return state;
    }
};
