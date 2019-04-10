import { combineEpics } from "redux-observable";
import { CreateGradeCategoryEpic } from "./CreateGradeCategoryEpic";
import { GetGradeCategoriesForCourseEpic } from "./GetGradeCategoriesForCourseEpic";

export const GradeCategoryDataEpics = combineEpics(
    CreateGradeCategoryEpic,
    GetGradeCategoriesForCourseEpic,
);
