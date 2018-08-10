import { ClearCourses, ClearCoursesCreator} from "./ClearCourses";
import { CreateCategory, CreateCategoryCreator } from "./CreateCategoryOnCourse";
import { CreateCourse, CreateCourseCreator } from "./CreateCourse";
import { SetCourses, SetCoursesCreator } from "./SetCourses";

export { CourseDataActionTypes } from "./types";

export {
    ClearCourses,
    CreateCourse,
    CreateCategory,
    SetCourses,
};

export {
    ClearCoursesCreator,
    CreateCourseCreator,
    CreateCategoryCreator,
    SetCoursesCreator,
};

export type CourseDataActions =
    ClearCourses |
    CreateCategory |
    CreateCourse |
    SetCourses;
