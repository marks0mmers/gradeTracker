import { CourseControlActionTypes as types } from ".";

export interface CreateCategoryFormClear {
    type: types.CREATE_CATEGORY_FORM_CLEAR;
}

export const CreateCategoryFormClearCreator = () => ({
    type: types.CREATE_CATEGORY_FORM_CLEAR,
});
