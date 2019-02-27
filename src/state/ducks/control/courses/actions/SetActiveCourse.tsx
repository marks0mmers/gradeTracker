import { Course } from "src/models/Course";
import { CourseControlActionTypes as types } from ".";

export interface SetActiveCourse {
    course?: Course;
    type: types.SET_ACTIVE_COURSE;
}

export const SetActiveCourseCreator = (course?: Course): SetActiveCourse => ({
    course,
    type: types.SET_ACTIVE_COURSE,
});
