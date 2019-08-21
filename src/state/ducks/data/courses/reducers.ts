import { List, Map, Record, RecordOf } from "immutable";
import { Course } from "../../../../models/Course";
import {
    CourseDataActions,
    CourseDataActionTypes as types,
} from "./";

interface ICourseDataState {
    courses: Map<string, Course>;
    coursesForUser: Map<string, Course>;
}

export const CourseDataState = Record<ICourseDataState>({
    courses: Map(),
    coursesForUser: Map(),
});

export type CourseDataState = RecordOf<ICourseDataState>;

export const CourseDataReducer = (
    state = new CourseDataState(),
    action: CourseDataActions,
): CourseDataState => {
    switch (action.type) {
        case (types.CREATE_NEW_COURSE_SUCCESS):
            return action.course.id
                ? state.setIn(["courses", action.course.id], action.course)
                : state;
        case (types.GET_COURSES_CURRENT_USER_SUCCESS):
            return state.set("courses", List(action.courses)
                .map(c => new Course(c))
                .toMap()
                .mapKeys((_, c) => c.id || "")
                .toMap());
        case (types.EDIT_COURSE_SUCCESS):
            return action.newCourse.id
                ? state.setIn(["courses", action.newCourse.id], action.newCourse)
                : state;
        case (types.DELETE_COURSE_SUCCESS):
            return action.course.id
                ? state.removeIn(["courses", action.course.id])
                : state;
        case (types.SET_COURSES_FOR_USER):
            return state.set("coursesForUser", action.courses);
        default:
            return state;
    }
};
