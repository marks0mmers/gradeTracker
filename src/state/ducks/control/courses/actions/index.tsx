import { CreateCategoryFormChange, CreateCategoryFormChangeCreator } from "./CreateCategoryFormChange";
import { CreateCategoryFormClear, CreateCategoryFormClearCreator } from "./CreateCategoryFormClear";
import { CreateCourseFormChange, CreateCourseFormChangeCreator } from "./CreateCourseFormChange";
import { CreateCourseFormClear, CreateCourseFormClearCreator } from "./CreateCourseFormClear";
import { SelectGradeCategory, SelectGradeCategoryCreator } from "./SelectGradeCategory";
import { SetActiveCourse, SetActiveCourseCreator } from "./SetActiveCourse";
export * from "./types";

export {
    CreateCategoryFormChange,
    CreateCategoryFormClear,
    CreateCourseFormChange,
    CreateCourseFormClear,
    SelectGradeCategory,
    SetActiveCourse,
};

export {
    CreateCategoryFormChangeCreator,
    CreateCategoryFormClearCreator,
    CreateCourseFormChangeCreator,
    CreateCourseFormClearCreator,
    SelectGradeCategoryCreator,
    SetActiveCourseCreator,
};

export type CourseControlActions =
    CreateCategoryFormChange |
    CreateCategoryFormClear |
    CreateCourseFormChange |
    CreateCourseFormClear |
    SelectGradeCategory |
    SetActiveCourse;
