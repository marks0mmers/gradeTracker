import { CourseDataActionTypes as types } from ".";

export interface DeleteGradeFromCategory {
    courseTitle: string;
    type: types.DELETE_GRADE_FROM_CATEGORY;
    categoryTitle: string;
    gradeName: string;
}

export const DeleteGradeFromCategoryCreator = (
    courseTitle: string,
    categoryTitle: string,
    gradeName: string,
): DeleteGradeFromCategory => ({
    categoryTitle,
    courseTitle,
    gradeName,
    type: types.DELETE_GRADE_FROM_CATEGORY,
});
