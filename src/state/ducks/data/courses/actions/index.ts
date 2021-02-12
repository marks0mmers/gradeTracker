import { CreateNewCourse, CreateNewCourseSuccess } from "./CreateNewCourse";
import { DeleteCourse, DeleteCourseSuccess } from "./DeleteCourse";
import { EditCourse, EditCourseSuccess } from "./EditCourse";
import { GetCoursesCurrentUser, GetCoursesCurrentUserSuccess } from "./GetCoursesCurrentUser";
import { SetCoursesForUser } from "./SetCoursesForUser";

export * from "./types";
export * from "./CreateNewCourse";
export * from "./GetCoursesCurrentUser";
export * from "./EditCourse";
export * from "./DeleteCourse";
export * from "./SetCoursesForUser";

export type CourseDataActions =
    CreateNewCourse |
    CreateNewCourseSuccess |
    EditCourse |
    EditCourseSuccess |
    DeleteCourse |
    DeleteCourseSuccess |
    SetCoursesForUser |
    GetCoursesCurrentUser |
    GetCoursesCurrentUserSuccess;
