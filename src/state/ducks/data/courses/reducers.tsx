import { List, Record } from "immutable";
import { Course } from "../../../../models/Course";
import {
    CourseDataActions,
    CourseDataActionTypes as types,
} from "./";

export const CourseDataStateRecord = Record({
    courses: List(),
});

export class CourseDataState extends CourseDataStateRecord {
    public courses: List<Course>;
}

export const CourseDataReducer = (
    state = new CourseDataState(),
    action: CourseDataActions,
) => {
    switch (action.type) {
        case (types.CREATE_COURSE):
            return state.set("courses", state.courses.push(action.course));
        case (types.CREATE_CATEGORY):
            const indexToSet = state.courses.indexOf(action.course);
            const courseToSet = new Course({
                categories: action.course.categories && action.course.categories.insert(0, action.category),
                creditHours: action.course.creditHours,
                description: action.course.description,
                section: action.course.section,
                title: action.course.title,
            });
            return state.set("courses", state.courses.set(indexToSet, courseToSet));
        case (types.SET_COURSES):
            return state.set("courses", action.courses);
        case (types.CLEAR_COURSES):
            return state.set("courses", List());
        default:
            return state;
    }
};
