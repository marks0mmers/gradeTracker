import { GradeCategory } from "../../../../../models/GradeCategory";
import { GradeCategoryDataActionTypes as types } from "./types";

export interface DeleteGradeCategory {
    categoryId: string;
    type: types.DELETE_GRADE_CATEGORY;
}

export const DeleteGradeCategoryCreator = (categoryId: string): DeleteGradeCategory => ({
    categoryId,
    type: types.DELETE_GRADE_CATEGORY,
});

export interface DeleteGradeCategorySuccess {
    category: GradeCategory;
    type: types.DELETE_GRADE_CATEGORY_SUCCESS;
}

export const DeleteGradeCategorySuccessCreator = (category: GradeCategory): DeleteGradeCategorySuccess => ({
    category,
    type: types.DELETE_GRADE_CATEGORY_SUCCESS,
});
