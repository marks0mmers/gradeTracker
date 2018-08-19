import { AddGradeToCategory, AddGradeToCategoryCreator } from "./AddGradeToCategory";
import { ClearCourses, ClearCoursesCreator} from "./ClearCourses";
import { CreateCategory, CreateCategoryCreator } from "./CreateCategoryOnCourse";
import { CreateCourse, CreateCourseCreator } from "./CreateCourse";
import { DeleteCategory, DeleteCategoryCreator } from "./DeleteCategory";
import { DeleteCourse, DeleteCourseCreator } from "./DeleteCourse";
import { DeleteGradeFromCategory, DeleteGradeFromCategoryCreator } from "./DeleteGradeFromCategory";
import { SetCourses, SetCoursesCreator } from "./SetCourses";
import { UpdateCategory, UpdateCategoryCreator } from "./UpdateCategory";
import { UpdateCourse, UpdateCourseCreator } from "./UpdateCourse";

export { CourseDataActionTypes } from "./types";

export {
    AddGradeToCategory,
    ClearCourses,
    CreateCourse,
    CreateCategory,
    DeleteCategory,
    DeleteCourse,
    DeleteGradeFromCategory,
    SetCourses,
    UpdateCategory,
    UpdateCourse,
};

export {
    AddGradeToCategoryCreator,
    ClearCoursesCreator,
    CreateCourseCreator,
    CreateCategoryCreator,
    DeleteCategoryCreator,
    DeleteCourseCreator,
    DeleteGradeFromCategoryCreator,
    SetCoursesCreator,
    UpdateCategoryCreator,
    UpdateCourseCreator,
};

export type CourseDataActions =
    AddGradeToCategory |
    ClearCourses |
    CreateCategory |
    CreateCourse |
    DeleteCategory |
    DeleteCourse |
    DeleteGradeFromCategory |
    SetCourses |
    UpdateCategory |
    UpdateCourse;
