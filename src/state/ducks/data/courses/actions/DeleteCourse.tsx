import { CourseDataActionTypes as types } from ".";

export interface DeleteCourse {
    courseTitle: string;
    type: types.DELETE_COURSE;
}

export const DeleteCourseCreator = (courseTitle: string): DeleteCourse => ({
    courseTitle,
    type: types.DELETE_COURSE,
});
