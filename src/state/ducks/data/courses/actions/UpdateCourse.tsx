import { CourseDataActionTypes as types } from ".";
import { Course } from "../../../../../models/Course";

export interface UpdateCourse {
    originalCourseTitle: string;
    updatedCourse: Course;
    type: types.UPDATE_COURSE;
}

export const UpdateCourseCreator = (originalCourseTitle: string, updatedCourse: Course): UpdateCourse => ({
    originalCourseTitle,
    type: types.UPDATE_COURSE,
    updatedCourse,
});
