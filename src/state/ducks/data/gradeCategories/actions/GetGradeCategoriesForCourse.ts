import { GradeCategory } from "../../../../../models/GradeCategory";
import { GradeCategoryDataActionTypes as types } from "./types";

export interface GetGradeCategoryForCourse {
    courseId: string;
    type: types.GET_GRADE_CATEGORIES_FOR_COURSE;
}

export const GetGradeCategoryForCourseCreator = (courseId: string): GetGradeCategoryForCourse => ({
    courseId,
    type: types.GET_GRADE_CATEGORIES_FOR_COURSE,
});

export interface GetGradeCategoryForCourseSuccess {
    gradeCategories: GradeCategory[];
    type: types.GET_GRADE_CATEGORIES_FOR_COURSE_SUCCESS;
}

export const GetGradeCategoryForCourseSuccessCreator = (
    gradeCategories: GradeCategory[],
): GetGradeCategoryForCourseSuccess => ({
    gradeCategories,
    type: types.GET_GRADE_CATEGORIES_FOR_COURSE_SUCCESS,
});
