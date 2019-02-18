import { Map, Record } from "immutable";
import { Course } from "../../../../models/Course";
import {
    CourseDataActions,
    CourseDataActionTypes as types,
} from "./";

export const CourseDataStateRecord = Record({
    courses: Map(),
});

export class CourseDataState extends CourseDataStateRecord {
    public courses: Map<string, Course>;
}

export const CourseDataReducer = (
    state = new CourseDataState(),
    action: CourseDataActions,
) => {
    switch (action.type) {
        case (types.CREATE_NEW_COURSE_SUCCESS):
            return action.course.id
                ? state.set("courses", state.courses.set(action.course.id, action.course))
                : state;
        case (types.GET_COURSES_CURRENT_USER_SUCCESS):
            return state.set("courses", action.courses);
        default:
            return state;
    }
};
