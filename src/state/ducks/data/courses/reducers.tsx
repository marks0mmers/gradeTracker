import { List, Map, Record } from "immutable";
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
): CourseDataState => {
    switch (action.type) {
        case (types.CREATE_NEW_COURSE_SUCCESS):
            return action.course.id
                ? state.setIn(["courses", action.course.id], action.course) as CourseDataState
                : state;
        case (types.GET_COURSES_CURRENT_USER_SUCCESS):
            const immutableCourses = action.courses.map((course) => new Course({...course}));
            const courseMap: Map<string, Course> = List(immutableCourses)
                .reduce((cs: Map<string, Course>, c: Course) => {
                    return c.id ? cs.set(c.id, c) : cs;
                }, Map<string, Course>());
            return state.set("courses", courseMap) as CourseDataState;
        case (types.EDIT_COURSE_SUCCESS):
            return action.newCourse.id
                ? state.setIn(["courses", action.newCourse.id], action.newCourse) as CourseDataState
                : state;
        case (types.DELETE_COURSE_SUCCESS):
            return action.course.id
                ? state.removeIn(["courses", action.course.id]) as CourseDataState
                : state;
        default:
            return state;
    }
};
