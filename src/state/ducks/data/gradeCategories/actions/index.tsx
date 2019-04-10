import { CreateGradeCategory, CreateGradeCategorySuccess } from "./CreateGradeCategory";
import { GetGradeCategoryForCourse, GetGradeCategoryForCourseSuccess } from "./GetGradeCategoriesForCourse";
import { GradeCategoryFailureAction } from "./GradeCategoryFailureAction";

export * from "./types";
export * from "./CreateGradeCategory";
export * from "./GradeCategoryFailureAction";
export * from "./GetGradeCategoriesForCourse";

export type GradeCategoryDataActions =
    GradeCategoryFailureAction |
    CreateGradeCategory |
    CreateGradeCategorySuccess |
    GetGradeCategoryForCourse |
    GetGradeCategoryForCourseSuccess;
