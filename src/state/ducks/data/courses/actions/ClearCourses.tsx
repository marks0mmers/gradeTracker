import { CourseDataActionTypes as types } from ".";

export interface ClearCourses {
    type: types.CLEAR_COURSES;
}

export const ClearCoursesCreator = (): ClearCourses => ({
    type: types.CLEAR_COURSES,
});
