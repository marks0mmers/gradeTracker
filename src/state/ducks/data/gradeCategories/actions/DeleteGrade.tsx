import { Grade } from "../../../../../models/Grade";
import { GradeCategoryDataActionTypes as types } from "./types";

export interface DeleteGrade {
    gradeId: string;
    type: types.DELETE_GRADE;
}

export const DeleteGradeCreator = (gradeId: string): DeleteGrade => ({
    gradeId,
    type: types.DELETE_GRADE,
});

export interface DeleteGradeSuccess {
    grade: Grade;
    type: types.DELETE_GRADE_SUCCESS;
}

export const DeleteGradeSuccessCreator = (grade: Grade): DeleteGradeSuccess => ({
    grade,
    type: types.DELETE_GRADE_SUCCESS,
});
