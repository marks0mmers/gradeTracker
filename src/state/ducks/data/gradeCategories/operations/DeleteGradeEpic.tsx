import { generateHeaders } from "src/util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    DeleteGrade,
    DeleteGradeSuccessCreator,
    GradeCategoryDataActionTypes as types,
    GradeCategoryFailureActionCreator,
} from "../actions";

export const DeleteGradeEpic = epicBuilder(
    DeleteGradeSuccessCreator,
    GradeCategoryFailureActionCreator,
    types.DELETE_GRADE,
    AjaxMethodType.DELETE,
    (action: DeleteGrade) => `/api/grades/${action.gradeId}`,
    generateHeaders(),
);
