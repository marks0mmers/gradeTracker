import { List, Map, Record } from "immutable";
import { GradeCategory } from "../../../../models/GradeCategory";
import { GradeCategoryDataActions, GradeCategoryDataActionTypes as types } from "./actions";

export const GradeCategoryDataStateRecord = Record({
    gradeCategories: Map(),
});

export class GradeCategoryDataState extends GradeCategoryDataStateRecord {
    public gradeCategories: Map<string, GradeCategory>;
}

export const GradeCategoryDataReducer = (
    state = new GradeCategoryDataState(),
    action: GradeCategoryDataActions,
): GradeCategoryDataState => {
    switch (action.type) {
        case (types.CREATE_GRADE_CATEGORY_SUCCESS):
            return state.setIn(
                ["gradeCategories", action.gradeCategory.id],
                new GradeCategory(action.gradeCategory).set("grades", List(action.gradeCategory.grades)),
            ) as GradeCategoryDataState;
        case (types.GET_GRADE_CATEGORIES_FOR_COURSE_SUCCESS):
            return state.set("gradeCategories", List(action.gradeCategories)
                .reduce((
                    categories: Map<string, GradeCategory>,
                    category: GradeCategory,
                ) => categories.set(
                    category.id, new GradeCategory(category).set("grades", List(category.grades)) as GradeCategory,
                ), Map<string, GradeCategory>())) as GradeCategoryDataState;
        case (types.GET_GRADE_CATEGORIES_FOR_CURRENT_USER_SUCCESS):
            return state.set("gradeCategories", List(action.gradeCategories)
                .reduce((
                    categories: Map<string, GradeCategory>,
                    category: GradeCategory,
                ) => categories.set(
                    category.id, new GradeCategory(category).set("grades", List(category.grades)) as GradeCategory,
                ), Map<string, GradeCategory>())) as GradeCategoryDataState;
        case (types.EDIT_GRADE_CATEGORY_SUCCESS):
            return state.setIn(
                ["gradeCategories", action.category.id],
                new GradeCategory(action.category).set("grades", List(action.category.grades)),
            ) as GradeCategoryDataState;
        case (types.DELETE_GRADE_CATEGORY_SUCCESS):
            return state.removeIn(["gradeCategories", action.category.id]) as GradeCategoryDataState;
        case (types.CREATE_GRADE_SUCCESS):
            return state.setIn(
                ["gradeCategories", action.grade.gradeCategoryId, "grades", -1],
                action.grade,
            ) as GradeCategoryDataState;
        case (types.EDIT_GRADE_SUCCESS):
            const existingGrades = state.gradeCategories.get(action.grade.gradeCategoryId).grades;
            return state.setIn([
                "gradeCategories",
                action.grade.gradeCategoryId,
                "grades",
                existingGrades.indexOf(action.grade),
            ], action.grade) as GradeCategoryDataState;
        case (types.DELETE_GRADE_SUCCESS):
            const existingGrades2 = state.gradeCategories.get(action.grade.gradeCategoryId).grades;
            return state.removeIn([
                "gradeCategories",
                action.grade.gradeCategoryId,
                "grades",
                existingGrades2.indexOf(action.grade),
            ]) as GradeCategoryDataState;
        default:
            return state;
    }
};
