import { GradeCategory } from "../../../../../models/GradeCategory";
import { GradeCategoryDataActionTypes as types } from "./types";

export interface GetGradeCategoriesForCurrentUser {
    type: types.GET_GRADE_CATEGORIES_FOR_CURRENT_USER;
}

export const GetGradeCategoriesForCurrentUserCreator = (): GetGradeCategoriesForCurrentUser => ({
    type: types.GET_GRADE_CATEGORIES_FOR_CURRENT_USER,
});

export interface GetGradeCategoriesForCurrentUserSuccess {
    gradeCategories: GradeCategory[];
    type: types.GET_GRADE_CATEGORIES_FOR_CURRENT_USER_SUCCESS;
}

export const GetGradeCategoriesForCurrentUserSuccessCreator = (
    gradeCategories: GradeCategory[],
): GetGradeCategoriesForCurrentUserSuccess => ({
    gradeCategories,
    type: types.GET_GRADE_CATEGORIES_FOR_CURRENT_USER_SUCCESS,
});
