import { GradeCategory } from "../../../../../models/GradeCategory";
import { GradeCategoryDataActionTypes as types } from "./types";

export interface EditGradeCategory {
    category: GradeCategory;
    type: types.EDIT_GRADE_CATEGORY;
}

export const EditGradeCategoryCreator = (category: GradeCategory): EditGradeCategory => ({
    category,
    type: types.EDIT_GRADE_CATEGORY,
});

export interface EditGradeCategorySuccess {
    category: GradeCategory;
    type: types.EDIT_GRADE_CATEGORY_SUCCESS;
}

export const EditGradeCategorySuccessCreator = (category: GradeCategory): EditGradeCategorySuccess => ({
    category,
    type: types.EDIT_GRADE_CATEGORY_SUCCESS,
});
