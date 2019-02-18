import { combineEpics } from "../../../../../../node_modules/redux-observable";
import { CreateNewCourseEpic } from "./CreateNewCourseEpic";
import { GetCoursesCurrentUserEpic } from "./GetCoursesCurrentUserEpic";

export const CourseDataEpics = combineEpics(
    CreateNewCourseEpic,
    GetCoursesCurrentUserEpic,
);
