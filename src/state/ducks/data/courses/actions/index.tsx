import { AddGradeToCategory, AddGradeToCategoryCreator } from "./AddGradeToCategory";
import { ClearCourses, ClearCoursesCreator} from "./ClearCourses";
import { CreateCategory, CreateCategoryCreator } from "./CreateCategoryOnCourse";
import { CreateCourse, CreateCourseCreator } from "./CreateCourse";
import { DeleteGradeFromCategory, DeleteGradeFromCategoryCreator } from "./DeleteGradeFromCategory";
import { SetCourses, SetCoursesCreator } from "./SetCourses";

export { CourseDataActionTypes } from "./types";

export {
    AddGradeToCategory,
    ClearCourses,
    CreateCourse,
    CreateCategory,
    DeleteGradeFromCategory,
    SetCourses,
};

export {
    AddGradeToCategoryCreator,
    ClearCoursesCreator,
    CreateCourseCreator,
    CreateCategoryCreator,
    DeleteGradeFromCategoryCreator,
    SetCoursesCreator,
};

export type CourseDataActions =
    AddGradeToCategory |
    ClearCourses |
    CreateCategory |
    CreateCourse |
    DeleteGradeFromCategory |
    SetCourses;
