import { List, Map } from "immutable";
import { createSelector } from "reselect";
import { AnalysisCourse } from "../../../../models/AnalysisCourse";
import { Course } from "../../../../models/Course";
import { DataGridElement } from "../../../../views/controls/data-grid";
import { RootState } from "../../../rootReducer";
import { getCourses } from "../../data/courses";

export const getAnalysisGridColumns = (state: RootState) => state.control.analysis.visibleColumns;

export const getAnalysisGridData = createSelector(
    [
        getCourses,
    ],
    (
        courses: Map<string, Course>,
    ) => {
        const retList: List<DataGridElement<AnalysisCourse>> = List();

        // TODO Rewrite this logic

        // courses.forEach((course: Course) => {
        //     let currentTotal = 0;
        //     let guarenteedTotal = 0;
        //     let potentialTotal = 0;
        //     let numberOfNonZeroAverages = 0;
        //     if (course.categories) {
        //         course.categories.forEach((category: GradeCategory) => {
        //             const numberOfGradesOrSize = typeof category.numberOfGrades === "number"
        //                 ? category.numberOfGrades
        //                 : category.grades.size;
        //             const calculatedCategory = new GradeCategory({
        //                 currentAverage: !isNaN(category.grades.reduce(
        //                     (total: number, value: number) => total + value, 0,
        //                 ) / category.grades.size)
        //                 ? category.grades.reduce(
        //                     (total: number, value: number) => total + value, 0,
        //                 ) / category.grades.size
        //                 : 0,

        //                 guarenteedAverage: !isNaN(category.grades.reduce(
        //                     (total: number, value: number) => total + value, 0,
        //                 ) / numberOfGradesOrSize)
        //                 ? category.grades.reduce(
        //                     (total: number, value: number) => total + value, 0,
        //                 ) / numberOfGradesOrSize
        //                 : 0,

        //                 numberOfGrades: category.numberOfGrades,

        //                 percentage: category.percentage,

        //                 potentialAverage: !isNaN((category.grades.reduce(
        //                     (total: number, value: number) => total + value, 0,
        //                 ) + ((numberOfGradesOrSize - category.grades.size) * 100)) / numberOfGradesOrSize)
        //                 ? (category.grades.reduce(
        //                     (total: number, value: number) => total + value, 0,
        //                 ) + ((numberOfGradesOrSize - category.grades.size) * 100)) / numberOfGradesOrSize
        //                 : 0,

        //                 remainingGrades: numberOfGradesOrSize - category.grades.size,

        //                 title: category.title,
        //             });
        //             currentTotal += calculatedCategory.currentAverage;
        //             if (calculatedCategory.currentAverage !== 0) {
        //                 numberOfNonZeroAverages++;
        //             }
        //             guarenteedTotal += calculatedCategory.guarenteedAverage;
        //             potentialTotal += calculatedCategory.potentialAverage;
        //         });
        //         currentTotal /= (numberOfNonZeroAverages || 1);
        //         guarenteedTotal /= course.categories.size;
        //         potentialTotal /= course.categories.size;
        //     }
        //     retList = retList.push(new DataGridElement({
        //         payload: new AnalysisCourse({
        //             creditHours: +course.creditHours,
        //             currentGPA: getGPAFromLetter(getLetterGrade(currentTotal)),
        //             currentLetter: getLetterGrade(currentTotal),
        //             guarenteedGPA: getGPAFromLetter(getLetterGrade(guarenteedTotal)),
        //             guarenteedLetter: getLetterGrade(guarenteedTotal),
        //             potentialGPA: getGPAFromLetter(getLetterGrade(potentialTotal)),
        //             potentialLetter: getLetterGrade(potentialTotal),
        //             title: course.title,
        //         }),
        //     }));
        // });
        // let currentTotalGPA = 0;
        // let guarenteedTotalGPA = 0;
        // let potentialTotalGPA = 0;
        // let creditHoursTotal = 0;
        // retList.forEach((value: DataGridElement<AnalysisCourse>) => {
        //     currentTotalGPA += value.payload.currentGPA * +value.payload.creditHours;
        //     guarenteedTotalGPA += value.payload.guarenteedGPA * +value.payload.creditHours;
        //     potentialTotalGPA += value.payload.potentialGPA * +value.payload.creditHours;
        //     creditHoursTotal += +value.payload.creditHours;
        // });
        // currentTotalGPA /= creditHoursTotal;
        // guarenteedTotalGPA /= creditHoursTotal;
        // potentialTotalGPA /= creditHoursTotal;
        // retList = retList.push(new DataGridElement({
        //     isBottom: true,
        //     payload: new AnalysisCourse({
        //         creditHours: creditHoursTotal,
        //         currentGPA: currentTotalGPA,
        //         currentLetter: getLetterFromGPA(currentTotalGPA),
        //         guarenteedGPA: guarenteedTotalGPA,
        //         guarenteedLetter: getLetterFromGPA(guarenteedTotalGPA),
        //         potentialGPA: potentialTotalGPA,
        //         potentialLetter: getLetterFromGPA(potentialTotalGPA),
        //         title: "Totals",
        //     }),
        // }));
        return retList;
    },
);
