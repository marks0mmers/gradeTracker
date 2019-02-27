import { combineEpics } from "../../../../../../node_modules/redux-observable";
import { CreateNewCourseEpic } from "./CreateNewCourseEpic";
import { DeleteCourseEpic } from "./DeleteCourseEpic";
import { EditCourseEpic } from "./EditCourseEpic";
import { FetchCoursesOnLoginEpic } from "./FetchCoursesOnLoginEpic";
import { GetCoursesCurrentUserEpic } from "./GetCoursesCurrentUserEpic";

export const CourseDataEpics = combineEpics(
    CreateNewCourseEpic,
    EditCourseEpic,
    DeleteCourseEpic,
    GetCoursesCurrentUserEpic,
    FetchCoursesOnLoginEpic,
);
