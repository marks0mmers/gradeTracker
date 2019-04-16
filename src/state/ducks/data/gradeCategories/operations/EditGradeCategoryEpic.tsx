import { generateHeaders } from "src/util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    EditGradeCategory,
    EditGradeCategorySuccessCreator,
    GradeCategoryDataActionTypes as types,
    GradeCategoryFailureActionCreator,
} from "../actions";

export const EditGradeCategoryEpic = epicBuilder(
    EditGradeCategorySuccessCreator,
    GradeCategoryFailureActionCreator,
    types.EDIT_GRADE_CATEGORY,
    AjaxMethodType.PUT,
    (action: EditGradeCategory) => `/api/gradeCategories/${action.category.id}`,
    generateHeaders(),
    (action: EditGradeCategory) => action.category.toJS(),
);
