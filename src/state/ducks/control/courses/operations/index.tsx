import { combineEpics } from "../../../../../../node_modules/redux-observable";
import { SetCreatedCourseActiveEpic } from "./SetCreatedCourseActiveEpic";
import { SetUpdatedCourseActiveEpic } from "./SetUpdatedCourseActiveEpic";

export const CourseControlEpics = combineEpics(
    SetCreatedCourseActiveEpic,
    SetUpdatedCourseActiveEpic,
);
