import { Course } from "../../../../../models/Course";
import { CourseDataActionTypes as types } from "./types";

export interface EditCourse {
    course: Course;
    type: types.EDIT_COURSE;
}

export const EditCourseCreator = (course: Course): EditCourse => ({
    course,
    type: types.EDIT_COURSE,
});

export interface EditCourseSuccess {
    newCourse: Course;
    type: types.EDIT_COURSE_SUCCESS;
}

export const EditCourseSuccessCreator = (newCourse: Course): EditCourseSuccess => ({
    newCourse,
    type: types.EDIT_COURSE_SUCCESS,
});
