import { List } from "immutable";
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
        courses: List<Course>,
        activeCourse: string,
        selectedGradeCategory: string,
    ) => {
        let elements: List<DataGridElement<GradeCategory>> = List();
        const course = courses.find((value: Course) => value.title === activeCourse);
        (course && course.categories) ? course.categories.forEach((category: GradeCategory) => {
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
                ) / category.numberOfGrades)
                ? category.grades.reduce(
                    (total: number, value: number) => total + value, 0,
                ) / category.numberOfGrades
                : 0,

                numberOfGrades: category.numberOfGrades,

                percentage: category.percentage,

                potentialAverage: !isNaN((category.grades.reduce(
                    (total: number, value: number) => total + value, 0,
                ) + ((category.numberOfGrades - category.grades.size) * 100)) / category.numberOfGrades)
                ? (category.grades.reduce(
                    (total: number, value: number) => total + value, 0,
                ) + ((category.numberOfGrades - category.grades.size) * 100)) / category.numberOfGrades
                : 0,

                remainingGrades: category.numberOfGrades - category.grades.size,

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
        elements.forEach((value: DataGridElement<GradeCategory>) => {
            percentage += value.payload.percentage;
            currentAverage += value.payload.currentAverage;
            guarenteedAverage += value.payload.guarenteedAverage;
            numberOfGrades += value.payload.numberOfGrades;
            potentialAverage += value.payload.potentialAverage;
            remainingGrades += value.payload.remainingGrades;
        });
        currentAverage /= elements.size;
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
