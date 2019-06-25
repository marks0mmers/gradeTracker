import { SelectGradeCategory } from "./SelectGradeCategory";
import { SetActiveCourse } from "./SetActiveCourse";
export * from "./types";

export * from "./SelectGradeCategory";
export * from "./SetActiveCourse";

export type CourseControlActions =
    SelectGradeCategory |
    SetActiveCourse;
