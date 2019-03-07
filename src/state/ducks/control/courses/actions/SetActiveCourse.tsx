import { CourseControlActionTypes as types } from ".";
import { Course } from "../../../../../models/Course";

export interface SetActiveCourse {
    course?: Course;
    type: types.SET_ACTIVE_COURSE;
}

export const SetActiveCourseCreator = (course?: Course): SetActiveCourse => ({
    course,
    type: types.SET_ACTIVE_COURSE,
});
