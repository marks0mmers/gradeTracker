import { CourseDataActionTypes as types } from ".";
import { Course } from "../../../../../models/Course";
import { GradeCategory } from "../../../../../models/GradeCategory";

export interface CreateCategory {
    category: GradeCategory;
    course: Course;
    type: types.CREATE_CATEGORY;
}

export const CreateCategoryCreator = (course: Course, category: GradeCategory) => ({
    category,
    course,
    type: types.CREATE_CATEGORY,
});
