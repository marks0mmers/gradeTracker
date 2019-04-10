import { Map } from "immutable";
import { createSelector } from "reselect";
import { GradeCategory } from "../../../../models/GradeCategory";
import { DataGridElement } from "../../../../views/controls/data-grid";
import { RootState } from "../../../rootReducer";
import { getGradeCategories } from "../../data/gradeCategories";

export const getActiveCourse = (state: RootState) => state.control.course.activeCourse;
export const getDetailedColumns = (state: RootState) => state.control.course.detailedColumns;
export const getSelectedGradeCategory = (state: RootState) => state.control.course.selectedGradeCategory;

export const getDetailedCourseElements = createSelector(
    [getGradeCategories],
    (
        selectedGradeCategory: Map<string, GradeCategory>,
    ) => {
        return selectedGradeCategory.map((gradeCategory: GradeCategory) => {
            return new DataGridElement<GradeCategory>({
                payload: gradeCategory,
            });
        }).toList();
    },
);
