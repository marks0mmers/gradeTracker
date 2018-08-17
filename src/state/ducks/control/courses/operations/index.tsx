import { combineEpics } from "../../../../../../node_modules/redux-observable";
import { SetCreatedCourseActiveEpic } from "./SetCreatedCourseActiveEpic";

export const CourseControlEpics = combineEpics(
    SetCreatedCourseActiveEpic,
);
