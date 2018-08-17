import { combineEpics } from "redux-observable";
import { CourseControlEpics } from "./ducks/control/courses";

export const rootEpic = combineEpics(
    CourseControlEpics,
);
