import { combineEpics } from "redux-observable";
import { CourseControlEpics } from "./ducks/control/courses";
import { CourseDataEpics } from "./ducks/data/courses/operations";
import { GradeCategoryDataEpics } from "./ducks/data/gradeCategories";
import { UserDataEpics } from "./ducks/data/users";
import { ViewRequestEpics } from "./ducks/data/viewRequests/operations";

export const rootEpic = combineEpics(
    CourseControlEpics,
    UserDataEpics,
    CourseDataEpics,
    GradeCategoryDataEpics,
    ViewRequestEpics,
);
