import { GradeCategoryDataActionTypes as types } from "./types";

export interface GradeCategoryFailureAction {
    error: Error;
    type: types.GRADE_CATEGORY_FAILURE_ACTION;
}

export const GradeCategoryFailureActionCreator = (error: Error): GradeCategoryFailureAction => ({
    error,
    type: types.GRADE_CATEGORY_FAILURE_ACTION,
});
