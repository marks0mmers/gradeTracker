import { CourseControlActionTypes as types } from ".";

export interface CreateCategoryFormChange {
    name: string;
    value: string;
    type: types.CREATE_CATEGORY_FORM_CHANGE;
}

export const CreateCategoryFormChangeCreator = (name: string, value: string) => ({
    name,
    type: types.CREATE_CATEGORY_FORM_CHANGE,
    value,
});
