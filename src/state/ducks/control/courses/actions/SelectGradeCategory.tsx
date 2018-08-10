import { CourseControlActionTypes as types } from ".";
import { GradeCategory } from "../../../../../models/GradeCategory";

export interface SelectGradeCategory {
    gradeCategory: GradeCategory;
    type: types.SELECT_GRADE_CATEGORY;
}

export const SelectGradeCategoryCreator = (gradeCategory?: GradeCategory) => ({
    gradeCategory,
    type: types.SELECT_GRADE_CATEGORY,
});
