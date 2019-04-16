import { Grade } from "src/models/Grade";
import { GradeCategoryDataActionTypes as types } from "./types";

export interface EditGrade {
    grade: Grade;
    type: types.EDIT_GRADE;
}

export const EditGradeCreator = (grade: Grade): EditGrade => ({
    grade,
    type: types.EDIT_GRADE,
});

export interface EditGradeSuccess {
    grade: Grade;
    type: types.EDIT_GRADE_SUCCESS;
}

export const EditGradeSuccessCreator = (grade: Grade): EditGradeSuccess => ({
    grade,
    type: types.EDIT_GRADE_SUCCESS,
});
