import { combineEpics } from "../../../../../../node_modules/redux-observable";
import { ChangeRouteOnCoursesLoadEpic } from "./ChangeRouteOnCoursesLoadEpic";
import { FetchGradesOnLoginEpic } from "./FetchGradesOnLoginEpic";
import { PushRouteOnActiveCourseEpic } from "./PushRouteOnActiveCourseEpic";

export const CourseControlEpics = combineEpics(
    PushRouteOnActiveCourseEpic,
    ChangeRouteOnCoursesLoadEpic,
    FetchGradesOnLoginEpic,
);
