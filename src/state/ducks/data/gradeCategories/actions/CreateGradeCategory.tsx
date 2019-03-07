import { GradeCategory } from "../../../../../models/GradeCategory";
import { GradeCategoryDataActionTypes as types } from "./types";

export interface CreateGradeCategory {
    gradeCategory: GradeCategory;
    courseId: string;
    type: types.CREATE_GRADE_CATEGORY;
}

export const CreateGradeCategoryCreator = (gradeCategory: GradeCategory, courseId: string): CreateGradeCategory => ({
    gradeCategory,
    courseId,
    type: types.CREATE_GRADE_CATEGORY,
});

export interface CreateGradeCategorySuccess {
    gradeCategory: GradeCategory;
    type: types.CREATE_GRADE_CATEGORY_SUCCESS;
}

export const CreateGradeCategorySuccessCreator = (gradeCategory: GradeCategory): CreateGradeCategorySuccess => ({
    gradeCategory,
    type: types.CREATE_GRADE_CATEGORY_SUCCESS,
});
