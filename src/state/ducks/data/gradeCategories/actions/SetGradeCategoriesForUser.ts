import { Map } from "immutable";
import { GradeCategory } from "../../../../../models/GradeCategory";
import { GradeCategoryDataActionTypes as types } from "./types";

export interface SetGradeCategoriesForUser {
    categories: Map<string, GradeCategory>;
    type: types.SET_GRADE_CATEGORIES_FOR_USER;
}

export const SetGradeCategoriesForUserCreator = (
    categories: Map<string, GradeCategory>,
): SetGradeCategoriesForUser => ({
    categories,
    type: types.SET_GRADE_CATEGORIES_FOR_USER,
});
