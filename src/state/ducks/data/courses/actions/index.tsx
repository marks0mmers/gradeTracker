import { CreateNewCourse, CreateNewCourseSuccess } from "./CreateNewCourse";
import { DeleteCourse, DeleteCourseSuccess } from "./DeleteCourse";
import { EditCourse, EditCourseSuccess } from "./EditCourse";
import { GetCoursesCurrentUser, GetCoursesCurrentUserSuccess } from "./GetCoursesCurrentUser";

export * from "./types";
export * from "./CreateNewCourse";
export * from "./GetCoursesCurrentUser";
export * from "./EditCourse";
export * from "./DeleteCourse";

export type CourseDataActions =
    CreateNewCourse |
    CreateNewCourseSuccess |
    EditCourse |
    EditCourseSuccess |
    DeleteCourse |
    DeleteCourseSuccess |
    GetCoursesCurrentUser |
    GetCoursesCurrentUserSuccess;
