import { combineEpics } from "redux-observable";
import { CourseControlEpics } from "./ducks/control/courses";
import { CourseDataEpics } from "./ducks/data/courses/operations";
import { UserDataEpics } from "./ducks/data/users";

export const rootEpic = combineEpics(
    CourseControlEpics,
    UserDataEpics,
    CourseDataEpics,
);
