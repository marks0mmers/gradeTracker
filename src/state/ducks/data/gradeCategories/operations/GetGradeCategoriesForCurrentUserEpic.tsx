import { generateHeaders } from "src/util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    GetGradeCategoriesForCurrentUserSuccessCreator,
    GradeCategoryDataActionTypes as types,
    GradeCategoryFailureActionCreator,
} from "../actions";

export const GetGradeCategoriesForCurrentUserEpic = epicBuilder(
    GetGradeCategoriesForCurrentUserSuccessCreator,
    GradeCategoryFailureActionCreator,
    types.GET_GRADE_CATEGORIES_FOR_CURRENT_USER,
    AjaxMethodType.GET,
    () => "/api/gradeCategories",
    generateHeaders(),
);
