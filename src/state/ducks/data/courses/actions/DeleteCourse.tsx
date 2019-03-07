import { Course } from "../../../../../models/Course";
import { CourseDataActionTypes as types } from "./types";

export interface DeleteCourse {
    id: string;
    type: types.DELETE_COURSE;
}

export const DeleteCourseCreator = (id: string): DeleteCourse => ({
    id,
    type: types.DELETE_COURSE,
});

export interface DeleteCourseSuccess {
    course: Course;
    type: types.DELETE_COURSE_SUCCESS;
}

export const DeleteCourseSuccessCreator = (course: Course): DeleteCourseSuccess => ({
    course,
    type: types.DELETE_COURSE_SUCCESS,
});
