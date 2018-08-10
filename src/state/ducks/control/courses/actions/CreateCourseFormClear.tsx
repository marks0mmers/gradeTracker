import { CourseControlActionTypes as types } from ".";

export interface CreateCourseFormClear {
    type: types.CREATE_COURSE_FORM_CLEAR;
}

export const CreateCourseFormClearCreator = () => ({
    type: types.CREATE_COURSE_FORM_CLEAR,
});
