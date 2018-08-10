import { CourseControlActionTypes as types } from ".";

export interface CreateCourseFormChange {
    name: string;
    value: string;
    type: types.CREATE_COURSE_FORM_CHANGE;
}

export const CreateCourseFormChangeCreator = (name: string, value: string) => ({
    name,
    type: types.CREATE_COURSE_FORM_CHANGE,
    value,
});
