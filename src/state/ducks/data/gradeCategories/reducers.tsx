import { Map, Record } from "immutable";
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
            return state.setIn(["gradeCategories", action.gradeCategory.toJS()], action.gradeCategory.toJS());
        default:
            return state;
    }
};
