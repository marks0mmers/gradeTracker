import { CourseDataActionTypes as types } from ".";
import { Course } from "../../../../../models/Course";

export interface CreateCourse {
    course: Course;
    type: types.CREATE_COURSE;
}

export const CreateCourseCreator = (course: Course) => ({
    course,
    type: types.CREATE_COURSE,
});
