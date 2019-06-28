import { CreateGrade, CreateGradeSuccess } from "./CreateGrade";
import { CreateGradeCategory, CreateGradeCategorySuccess } from "./CreateGradeCategory";
import { DeleteGrade, DeleteGradeSuccess } from "./DeleteGrade";
import { DeleteGradeCategory, DeleteGradeCategorySuccess } from "./DeleteGradeCategory";
import { EditGrade, EditGradeSuccess } from "./EditGrade";
import { EditGradeCategory, EditGradeCategorySuccess } from "./EditGradeCategory";
import { GetGradeCategoryForCourse, GetGradeCategoryForCourseSuccess } from "./GetGradeCategoriesForCourse";
import {
    GetGradeCategoriesForCurrentUser,
    GetGradeCategoriesForCurrentUserSuccess,
} from "./GetGradeCategoriesForCurrentUser";
import { GradeCategoryFailureAction } from "./GradeCategoryFailureAction";
import { SetGradeCategoriesForUser } from "./SetGradeCategoriesForUser";

export * from "./types";
export * from "./CreateGradeCategory";
export * from "./GradeCategoryFailureAction";
export * from "./GetGradeCategoriesForCourse";
export * from "./EditGradeCategory";
export * from "./DeleteGradeCategory";
export * from "./CreateGrade";
export * from "./EditGrade";
export * from "./DeleteGrade";
export * from "./GetGradeCategoriesForCurrentUser";
export * from "./SetGradeCategoriesForUser";

export type GradeCategoryDataActions =
    GradeCategoryFailureAction |
    CreateGradeCategory |
    CreateGradeCategorySuccess |
    DeleteGradeCategory |
    DeleteGradeCategorySuccess |
    EditGradeCategory |
    EditGradeCategorySuccess |
    CreateGrade |
    CreateGradeSuccess |
    EditGrade |
    EditGradeSuccess |
    DeleteGrade |
    DeleteGradeSuccess |
    SetGradeCategoriesForUser |
    GetGradeCategoriesForCurrentUser |
    GetGradeCategoriesForCurrentUserSuccess |
    GetGradeCategoryForCourse |
    GetGradeCategoryForCourseSuccess;
