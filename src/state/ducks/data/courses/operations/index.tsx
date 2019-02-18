import { combineEpics } from "../../../../../../node_modules/redux-observable";
import { CreateNewCourseEpic } from "./CreateNewCourseEpic";
import { FetchCoursesOnLoginEpic } from "./FetchCoursesOnLoginEpic";
import { GetCoursesCurrentUserEpic } from "./GetCoursesCurrentUserEpic";

export const CourseDataEpics = combineEpics(
    CreateNewCourseEpic,
    GetCoursesCurrentUserEpic,
    FetchCoursesOnLoginEpic,
);
