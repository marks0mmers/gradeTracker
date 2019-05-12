import { Record } from "immutable";
import { Course } from "../../../../models/Course";
import {
    CourseControlActions,
    CourseControlActionTypes as types,
} from "./";

export const CourseControlStateRecord = Record({
    activeCourse: undefined,
    selectedGradeCategory: undefined,
});

export class CourseControlState extends CourseControlStateRecord {
    public activeCourse: Course;
    public selectedGradeCategory: string;
}

export const CourseControlReducer = (
    state = new CourseControlState(),
    action: CourseControlActions,
): CourseControlState => {
    switch (action.type) {
        case (types.SELECT_GRADE_CATEGORY):
            return state.set("selectedGradeCategory", action.gradeCategory) as CourseControlState;
        case (types.SET_ACTIVE_COURSE):
            return state.set("activeCourse", action.course) as CourseControlState;
        default:
            return state;
    }
};
