import { CourseDataActionTypes as types } from "./types";

export interface CourseFailureAction {
    err: Error;
    type: types.COURSE_FAILURE_ACTION;
}

export const CourseFailureActionCreator = (err: Error): CourseFailureAction => ({
    err,
    type: types.COURSE_FAILURE_ACTION,
});
