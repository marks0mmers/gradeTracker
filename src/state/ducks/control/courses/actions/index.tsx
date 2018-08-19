import { SelectGradeCategory, SelectGradeCategoryCreator } from "./SelectGradeCategory";
import { SetActiveCourse, SetActiveCourseCreator } from "./SetActiveCourse";
export * from "./types";

export {
    SelectGradeCategory,
    SetActiveCourse,
};

export {
    SelectGradeCategoryCreator,
    SetActiveCourseCreator,
};

export type CourseControlActions =
    SelectGradeCategory |
    SetActiveCourse;
