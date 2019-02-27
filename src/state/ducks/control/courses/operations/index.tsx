import { combineEpics } from "../../../../../../node_modules/redux-observable";
import { PushRouteOnActiveCourseEpic } from "./PushRouteOnActiveCourseEpic";

export const CourseControlEpics = combineEpics(
    PushRouteOnActiveCourseEpic,
);
