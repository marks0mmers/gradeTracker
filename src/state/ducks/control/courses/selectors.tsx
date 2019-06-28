import { Map } from "immutable";
import { createSelector } from "reselect";
import { GradeCategory } from "../../../../models/GradeCategory";
import { DataGridElement } from "../../../../views/controls/data-grid";
import { RootState } from "../../../rootReducer";
import { getGradeCategories } from "../../data/gradeCategories";

export const getActiveCourse = (state: RootState) => state.control.course.activeCourse;
export const getSelectedGradeCategory = (state: RootState) => state.control.course.selectedGradeCategory;

export const getDetailedCourseElements = createSelector(
    [getGradeCategories, getSelectedGradeCategory],
    (
        gradeCategories: Map<string, GradeCategory>,
        selectedGradeCategory?: string,
    ) => {
        let categories = gradeCategories.map((gradeCategory: GradeCategory) => new DataGridElement({
            payload: gradeCategory,
            isSelected: gradeCategory.id === selectedGradeCategory,
        }),
        ).toList();
        let numberOfGradesTotal = 0;
        let remainingGradesTotal = 0;
        let currentAverageTotal = 0;
        let potentialAverageTotal = 0;
        let guarenteedAverageTotal = 0;
        gradeCategories.forEach((g: GradeCategory) => {
            numberOfGradesTotal += g.numberOfGrades;
            remainingGradesTotal += g.remainingGrades;
            currentAverageTotal += (g.currentAverage * (g.percentage / 100));
            potentialAverageTotal += (g.potentialAverage * (g.percentage / 100));
            guarenteedAverageTotal += (g.guarenteedAverage * (g.percentage / 100));
        });
        if (gradeCategories.size > 0) {
            categories = categories.push(new DataGridElement({
                payload: new GradeCategory({
                    id: "",
                    title: "Total",
                    percentage: 100,
                    numberOfGrades: numberOfGradesTotal,
                    remainingGrades: remainingGradesTotal,
                    currentAverage: currentAverageTotal,
                    potentialAverage: potentialAverageTotal,
                    guarenteedAverage: guarenteedAverageTotal,
                    courseId: "",
                }),
                isBottom: true,
            }));
        }
        return categories;
    },
);
