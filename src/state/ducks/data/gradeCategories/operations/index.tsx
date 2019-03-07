import { combineEpics } from "redux-observable";
import { CreateGradeCategoryEpic } from "./CreateGradeCategoryEpic";

export const GradeCategoryDataEpics = combineEpics(
    CreateGradeCategoryEpic,
);
