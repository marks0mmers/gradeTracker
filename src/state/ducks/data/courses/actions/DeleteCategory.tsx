import { CourseDataActionTypes as types } from ".";

export interface DeleteCategory {
    courseTitle: string;
    categoryTitle: string;
    type: types.DELETE_CATEGORY;
}

export const DeleteCategoryCreator = (courseTitle: string, categoryTitle: string): DeleteCategory => ({
    categoryTitle,
    courseTitle,
    type: types.DELETE_CATEGORY,
});
