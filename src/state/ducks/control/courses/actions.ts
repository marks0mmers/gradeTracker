import { Course } from "../../../../models/Course";
import { CourseControlActionTypes as types } from "./types";

export interface SetActiveCourse {
    course?: Course;
    type: types.SET_ACTIVE_COURSE;
}

export const SetActiveCourseCreator = (course?: Course): SetActiveCourse => ({
    course,
    type: types.SET_ACTIVE_COURSE,
});

export interface SelectGradeCategory {
    gradeCategory: string;
    type: types.SELECT_GRADE_CATEGORY;
}

export const SelectGradeCategoryCreator = (gradeCategory?: string) => ({
    gradeCategory,
    type: types.SELECT_GRADE_CATEGORY,
});

export type CourseControlActions =
    SelectGradeCategory |
    SetActiveCourse;
