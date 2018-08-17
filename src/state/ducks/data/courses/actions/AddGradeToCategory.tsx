import { CourseDataActionTypes as types } from ".";
import { GradeCategory } from "../../../../../models/GradeCategory";

export interface AddGradeToCategory {
    courseTitle: string;
    type: types.ADD_GRADE_TO_CATEGORY;
    updatedCategory: GradeCategory;
}

export const AddGradeToCategoryCreator = (courseTitle: string, updatedCategory: GradeCategory): AddGradeToCategory => ({
    courseTitle,
    type: types.ADD_GRADE_TO_CATEGORY,
    updatedCategory,
});
