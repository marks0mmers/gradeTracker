import { Grade } from "src/models/Grade";
import { GradeCategoryDataActionTypes as types } from "./types";

export interface CreateGrade {
    grade: Grade;
    type: types.CREATE_GRADE;
}

export const CreateGradeCreator = (grade: Grade): CreateGrade => ({
    grade,
    type: types.CREATE_GRADE,
});

export interface CreateGradeSuccess {
    grade: Grade;
    type: types.CREATE_GRADE_SUCCESS;
}

export const CreateGradeSuccessCreator = (grade: Grade): CreateGradeSuccess => ({
    grade,
    type: types.CREATE_GRADE_SUCCESS,
});
