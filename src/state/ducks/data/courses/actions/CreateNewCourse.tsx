import { Course } from "../../../../../models/Course";
import { CourseDataActionTypes as types } from "./types";

export interface CreateNewCourse {
    course: Course;
    type: types.CREATE_NEW_COURSE;
}

export const CreateNewCourseCreator = (course: Course): CreateNewCourse => ({
    course,
    type: types.CREATE_NEW_COURSE,
});

export interface CreateNewCourseSuccess {
    course: Course;
    type: types.CREATE_NEW_COURSE_SUCCESS;
}

export const CreateNewCourseSuccessCreator = (course: Course): CreateNewCourseSuccess => ({
    course,
    type: types.CREATE_NEW_COURSE_SUCCESS,
});
