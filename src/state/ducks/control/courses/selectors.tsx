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
        activeCourse: string,
        selectedGradeCategory: string,
    ) => {
        let elements: List<DataGridElement<GradeCategory>> = List();
        const course = courses.get(activeCourse);
        (course && course.categories) ? course.categories.forEach((category: GradeCategory) => {
            const numberOfGradesOrSize = typeof category.numberOfGrades === "number"
                ? category.numberOfGrades
                : category.grades.size;
            const calculatedCategory = new GradeCategory({
                currentAverage: !isNaN(category.grades.reduce(
                    (total: number, value: number) => total + value, 0,
                ) / category.grades.size)
                ? category.grades.reduce(
                    (total: number, value: number) => total + value, 0,
                ) / category.grades.size
                : 0,

                guarenteedAverage: !isNaN(category.grades.reduce(
                    (total: number, value: number) => total + value, 0,
                ) / numberOfGradesOrSize)
                ? category.grades.reduce(
                    (total: number, value: number) => total + value, 0,
                ) / numberOfGradesOrSize
                : 0,

                numberOfGrades: category.numberOfGrades,

                percentage: category.percentage,

                potentialAverage: !isNaN((category.grades.reduce(
                    (total: number, value: number) => total + value, 0,
                ) + ((numberOfGradesOrSize - category.grades.size) * 100)) / numberOfGradesOrSize)
                ? (category.grades.reduce(
                    (total: number, value: number) => total + value, 0,
                ) + ((numberOfGradesOrSize - category.grades.size) * 100)) / numberOfGradesOrSize
                : 0,

                remainingGrades: numberOfGradesOrSize - category.grades.size,

                title: category.title,
            });
            elements = elements.push(
                new DataGridElement({
                    isSelected: selectedGradeCategory
                        ? calculatedCategory.title === selectedGradeCategory
                        : false,
                    payload: calculatedCategory,
                }),
            );
        }) : elements = elements;
        let percentage = 0;
        let currentAverage = 0;
        let guarenteedAverage = 0;
        let numberOfGrades = 0;
        let potentialAverage = 0;
        let remainingGrades = 0;
        let numberOfNonZeroAverages = 0;
        elements.forEach((value: DataGridElement<GradeCategory>) => {
            percentage += value.payload.percentage;
            currentAverage += value.payload.currentAverage;
            if (value.payload.currentAverage !== 0) {
                numberOfNonZeroAverages++;
            }
            guarenteedAverage += value.payload.guarenteedAverage;
            numberOfGrades += typeof value.payload.numberOfGrades === "number"
                ? value.payload.numberOfGrades
                : value.payload.grades.size;
            potentialAverage += value.payload.potentialAverage;
            remainingGrades += value.payload.remainingGrades;
        });

        currentAverage /= (numberOfNonZeroAverages || 1);
        guarenteedAverage /= elements.size;
        potentialAverage /= elements.size;
        elements = elements.push(
            new DataGridElement({
                isBottom: true,
                payload: new GradeCategory({
                    currentAverage: percentage === 100 ? currentAverage : undefined,
                    guarenteedAverage: percentage === 100 ? guarenteedAverage : undefined,
                    numberOfGrades,
                    percentage,
                    potentialAverage: percentage === 100 ? potentialAverage : undefined,
                    remainingGrades,
                    title: "Total",
                }),
            }),
        );

        return elements;
    },
);
