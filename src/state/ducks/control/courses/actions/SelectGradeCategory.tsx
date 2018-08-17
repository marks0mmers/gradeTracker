import { CourseControlActionTypes as types } from ".";

export interface SelectGradeCategory {
    gradeCategory: string;
    type: types.SELECT_GRADE_CATEGORY;
}

export const SelectGradeCategoryCreator = (gradeCategory?: string) => ({
    gradeCategory,
    type: types.SELECT_GRADE_CATEGORY,
});
