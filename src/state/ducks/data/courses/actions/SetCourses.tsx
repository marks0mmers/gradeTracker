import { List } from "immutable";
import { CourseDataActionTypes as types } from ".";
import { Course } from "../../../../../models/Course";

export interface SetCourses {
    courses: List<Course>;
    type: types.SET_COURSES;
}

export const SetCoursesCreator = (courses: List<Course>): SetCourses => ({
    courses,
    type: types.SET_COURSES,
});
