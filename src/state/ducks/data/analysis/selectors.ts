import { List, Map } from "immutable";
import { createSelector } from "reselect";
import { AnalysisCourse } from "../../../../models/AnalysisCourse";
import { Course } from "../../../../models/Course";
import { GradeCategory } from "../../../../models/GradeCategory";
import { getGPAFromLetter, getLetterFromGPA, getLetterGrade } from "../../../../util/GpaCalculator";
import { DataGridElement } from "../../../../views/controls/data-grid";
import { getCourses } from "../courses";
import { getCoursesForUser } from "../courses/selectors";
import { getGradeCategories } from "../gradeCategories";
import { getGradeCategoriesForUser } from "../gradeCategories/selectors";

const generateData = (courses: Map<string, Course>, gradeCategories: Map<string, GradeCategory>) => {
    let retList = List<DataGridElement<AnalysisCourse>>();

    courses.forEach((course) => {
        let currentTotal = 0;
        let guarenteedTotal = 0;
        let potentialTotal = 0;
        const categories = gradeCategories.filter((g) => g.courseId === course.id);
        if (categories) {
            categories.forEach((category) => {
                currentTotal += (category.currentAverage * category.percentage);
                guarenteedTotal += (category.guarenteedAverage * category.percentage);
                potentialTotal += (category.potentialAverage * category.percentage);
            });
            currentTotal /= 100;
            guarenteedTotal /= 100;
            potentialTotal /= 100;
        }
        retList = retList.push(new DataGridElement<AnalysisCourse>(
            new AnalysisCourse({
                creditHours: +course.creditHours,
                currentGPA: getGPAFromLetter(getLetterGrade(currentTotal)),
                currentLetter: getLetterGrade(currentTotal),
                guarenteedGPA: getGPAFromLetter(getLetterGrade(guarenteedTotal)),
                guarenteedLetter: getLetterGrade(guarenteedTotal),
                potentialGPA: getGPAFromLetter(getLetterGrade(potentialTotal)),
                potentialLetter: getLetterGrade(potentialTotal),
                title: course.title,
            }),
        ));
    });
    let currentTotalGPA = 0;
    let guarenteedTotalGPA = 0;
    let potentialTotalGPA = 0;
    let creditHoursTotal = 0;
    retList.forEach((value) => {
        currentTotalGPA += value.payload.currentGPA * +value.payload.creditHours;
        guarenteedTotalGPA += value.payload.guarenteedGPA * +value.payload.creditHours;
        potentialTotalGPA += value.payload.potentialGPA * +value.payload.creditHours;
        creditHoursTotal += +value.payload.creditHours;
    });
    currentTotalGPA /= creditHoursTotal;
    guarenteedTotalGPA /= creditHoursTotal;
    potentialTotalGPA /= creditHoursTotal;
    retList = retList.push(new DataGridElement<AnalysisCourse>(
        new AnalysisCourse({
            creditHours: creditHoursTotal,
            currentGPA: currentTotalGPA,
            currentLetter: getLetterFromGPA(currentTotalGPA),
            guarenteedGPA: guarenteedTotalGPA,
            guarenteedLetter: getLetterFromGPA(guarenteedTotalGPA),
            potentialGPA: potentialTotalGPA,
            potentialLetter: getLetterFromGPA(potentialTotalGPA),
            title: "Totals",
        }),
        undefined,
        true,
    ));
    return retList;
};

export const getAnalysisGridData = createSelector(
    [getCourses, getGradeCategories],
    generateData,
);

export const getAnalysisGridDataForUser = createSelector(
    [getCoursesForUser, getGradeCategoriesForUser],
    generateData,
);
