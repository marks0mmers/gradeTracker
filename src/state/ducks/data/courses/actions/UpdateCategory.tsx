import { CourseDataActionTypes as types } from ".";
import { GradeCategory } from "../../../../../models/GradeCategory";

export interface UpdateCategory {
    courseTitle: string;
    originalCategory: GradeCategory;
    updatedCategory: GradeCategory;
    type: types.UPDATE_CATEGORY;
}

export const UpdateCategoryCreator = (
    courseTitle: string,
    originalCategory: GradeCategory,
    updatedCategory: GradeCategory,
): UpdateCategory => ({
    courseTitle,
    originalCategory,
    type: types.UPDATE_CATEGORY,
    updatedCategory,
});
