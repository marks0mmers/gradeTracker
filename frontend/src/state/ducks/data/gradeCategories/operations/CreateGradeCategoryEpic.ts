import { generateHeaders } from "../../../../../util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    CreateGradeCategory,
    CreateGradeCategorySuccessCreator,
    GradeCategoryDataActionTypes as types,
    GradeCategoryFailureActionCreator,
} from "../actions";

export const CreateGradeCategoryEpic = epicBuilder(
    CreateGradeCategorySuccessCreator,
    GradeCategoryFailureActionCreator,
    types.CREATE_GRADE_CATEGORY,
    AjaxMethodType.POST,
    (action: CreateGradeCategory) => `/api/gradeCategories/course/${action.courseId}`,
    generateHeaders(),
    (action: CreateGradeCategory) => action.gradeCategory.toJS(),
);
