import { Map } from "immutable";
import { CourseDataActionTypes as types } from ".";
import { Course } from "../../../../../models/Course";

export interface SetCourses {
    courses: Map<string, Course>;
    type: types.SET_COURSES;
}

export const SetCoursesCreator = (courses: Map<string, Course>): SetCourses => ({
    courses,
    type: types.SET_COURSES,
});
