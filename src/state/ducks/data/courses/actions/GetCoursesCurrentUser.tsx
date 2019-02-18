import { Map } from "immutable";
import { Course } from "../../../../../models/Course";
import { CourseDataActionTypes as types } from "./types";

export interface GetCoursesCurrentUser {
    type: types.GET_COURSES_CURRENT_USER;
}

export const GetCoursesCurrentUserCreator = (): GetCoursesCurrentUser => ({
    type: types.GET_COURSES_CURRENT_USER,
});

export interface GetCoursesCurrentUserSuccess {
    courses: Map<string, Course>;
    type: types.GET_COURSES_CURRENT_USER_SUCCESS;
}

export const GetCoursesCurrentUserSuccessCreator = (courses: Map<string, Course>): GetCoursesCurrentUserSuccess => ({
    courses,
    type: types.GET_COURSES_CURRENT_USER_SUCCESS,
});
