import { generateHeaders } from "src/util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    CreateGrade,
    CreateGradeSuccessCreator,
    GradeCategoryDataActionTypes as types,
    GradeCategoryFailureActionCreator,
} from "../actions";

export const CreateGradeEpic = epicBuilder(
    CreateGradeSuccessCreator,
    GradeCategoryFailureActionCreator,
    types.CREATE_GRADE,
    AjaxMethodType.POST,
    (action: CreateGrade) => `/api/grades/gradeCategory/${action.grade.gradeCategoryId}`,
    generateHeaders(),
    (action: CreateGrade) => action.grade,
);
