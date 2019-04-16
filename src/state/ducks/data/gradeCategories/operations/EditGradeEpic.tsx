import { generateHeaders } from "src/util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    EditGrade,
    EditGradeSuccessCreator,
    GradeCategoryDataActionTypes as types,
    GradeCategoryFailureActionCreator,
} from "../actions";

export const EditGradeEpic = epicBuilder(
    EditGradeSuccessCreator,
    GradeCategoryFailureActionCreator,
    types.EDIT_GRADE,
    AjaxMethodType.PUT,
    (action: EditGrade) => `/api/grades/${action.grade.id}`,
    generateHeaders(),
    (action: EditGrade) => action.grade,
);
