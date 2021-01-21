import { combineEpics } from "redux-observable";
import { CreateGradeCategoryEpic } from "./CreateGradeCategoryEpic";
import { CreateGradeEpic } from "./CreateGradeEpic";
import { DeleteGradeCategoryEpic } from "./DeleteGradeCategoryEpic";
import { DeleteGradeEpic } from "./DeleteGradeEpic";
import { EditGradeCategoryEpic } from "./EditGradeCategoryEpic";
import { EditGradeEpic } from "./EditGradeEpic";
import { FetchCategoriesOnGradeChangeEpic } from "./FetchCategoriesOnGradeChangeEpic";
import { GetGradeCategoriesForCourseEpic } from "./GetGradeCategoriesForCourseEpic";
import { GetGradeCategoriesForCurrentUserEpic } from "./GetGradeCategoriesForCurrentUserEpic";

export const GradeCategoryDataEpics = combineEpics(
    CreateGradeCategoryEpic,
    EditGradeCategoryEpic,
    DeleteGradeCategoryEpic,
    CreateGradeEpic,
    EditGradeEpic,
    DeleteGradeEpic,
    GetGradeCategoriesForCourseEpic,
    FetchCategoriesOnGradeChangeEpic,
    GetGradeCategoriesForCurrentUserEpic,
);
