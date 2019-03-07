import { CreateGradeCategory, CreateGradeCategorySuccess } from "./CreateGradeCategory";
import { GradeCategoryFailureAction } from "./GradeCategoryFailureAction";

export * from "./types";
export * from "./CreateGradeCategory";
export * from "./GradeCategoryFailureAction";

export type GradeCategoryDataActions =
    GradeCategoryFailureAction |
    CreateGradeCategory |
    CreateGradeCategorySuccess;
