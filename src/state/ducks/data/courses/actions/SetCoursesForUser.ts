import { Map } from "immutable";
import { Course } from "../../../../../models/Course";
import { CourseDataActionTypes as types } from "./types";

export interface SetCoursesForUser {
    courses: Map<string, Course>;
    type: types.SET_COURSES_FOR_USER;
}

export const SetCoursesForUserCreator = (courses: Map<string, Course>): SetCoursesForUser => ({
    courses,
    type: types.SET_COURSES_FOR_USER,
});
