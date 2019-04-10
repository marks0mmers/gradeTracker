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
) => {
    switch (action.type) {
        case (types.CREATE_GRADE_CATEGORY_SUCCESS):
            return state.setIn(["gradeCategories", action.gradeCategory.id], new GradeCategory(action.gradeCategory));
        case (types.GET_GRADE_CATEGORIES_FOR_COURSE_SUCCESS):
            return state.set("gradeCategories", List(action.gradeCategories)
                .reduce((
                    categories: Map<string, GradeCategory>, category: GradeCategory,
                ) => categories.set(category.id, new GradeCategory(category)), Map<string, GradeCategory>()));
        default:
            return state;
    }
};
