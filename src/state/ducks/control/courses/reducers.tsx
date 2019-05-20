import { Record, RecordOf } from "immutable";
import { Course } from "../../../../models/Course";
import {
    CourseControlActions,
    CourseControlActionTypes as types,
} from "./";

interface ICourseControlState {
    activeCourse?: Course;
    selectedGradeCategory?: string;
}

export const CourseControlState = Record<ICourseControlState>({
    activeCourse: undefined,
    selectedGradeCategory: undefined,
});

export type CourseControlState = RecordOf<ICourseControlState>;

export const CourseControlReducer = (
    state = new CourseControlState(),
    action: CourseControlActions,
): CourseControlState => {
    switch (action.type) {
        case (types.SELECT_GRADE_CATEGORY):
            return state.set("selectedGradeCategory", action.gradeCategory);
        case (types.SET_ACTIVE_COURSE):
            return state.set("activeCourse", action.course);
        default:
            return state;
    }
};
