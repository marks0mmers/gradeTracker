import { generateHeaders } from "../../../../../util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    DeleteGradeCategory,
    DeleteGradeCategorySuccessCreator,
    GradeCategoryDataActionTypes as types,
    GradeCategoryFailureActionCreator,
} from "../actions";

export const DeleteGradeCategoryEpic = epicBuilder(
    DeleteGradeCategorySuccessCreator,
    GradeCategoryFailureActionCreator,
    types.DELETE_GRADE_CATEGORY,
    AjaxMethodType.DELETE,
    (action: DeleteGradeCategory) => `/api/gradeCategories/${action.categoryId}`,
    generateHeaders(),
);
