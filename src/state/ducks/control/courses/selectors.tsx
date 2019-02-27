import { List, Map } from "immutable";
import { createSelector } from "reselect";
import { Course } from "../../../../models/Course";
import { GradeCategory } from "../../../../models/GradeCategory";
import { DataGridElement } from "../../../../views/controls/data-grid";
import { RootState } from "../../../rootReducer";
import { getCourses } from "../../data/courses";

export const getActiveCourse = (state: RootState) => state.control.course.activeCourse;
export const getDetailedColumns = (state: RootState) => state.control.course.detailedColumns;
export const getSelectedGradeCategory = (state: RootState) => state.control.course.selectedGradeCategory;

export const getDetailedCourseElements = createSelector(
    [getCourses, getActiveCourse, getSelectedGradeCategory],
    (
        courses: Map<string, Course>,
        activeCourse: Course,
        selectedGradeCategory: string,
    ) => {
        return List <DataGridElement<GradeCategory>>();
    },
);
