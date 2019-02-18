import { CreateNewCourse, CreateNewCourseSuccess } from "./CreateNewCourse";
import { GetCoursesCurrentUser } from "./GetCoursesCurrentUser";

export * from "./types";
export * from "./CreateNewCourse";
export * from "./GetCoursesCurrentUser";

export type CourseDataActions =
    CreateNewCourse |
    CreateNewCourseSuccess |
    GetCoursesCurrentUser;
