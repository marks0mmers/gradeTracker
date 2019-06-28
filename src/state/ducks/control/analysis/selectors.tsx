import { List, Map } from "immutable";
import { createSelector } from "reselect";
import { AnalysisCourse } from "../../../../models/AnalysisCourse";
import { Course } from "../../../../models/Course";
import { GradeCategory } from "../../../../models/GradeCategory";
import { getGPAFromLetter, getLetterFromGPA, getLetterGrade } from "../../../../util/GpaCalculator";
import { DataGridElement } from "../../../../views/controls/data-grid";
import { getCourses } from "../../data/courses";
import { getCoursesForUser } from "../../data/courses/selectors";
import { getGradeCategories } from "../../data/gradeCategories";
import { getGradeCategoriesForUser } from "../../data/gradeCategories/selectors";

export const getAnalysisGridData = createSelector(
    [
        getCourses,
        getGradeCategories,
        getCoursesForUser,
        getGradeCategoriesForUser,
    ],
    (
        courses: Map<string, Course>,
        gradeCategories: Map<string, GradeCategory>,
        coursesForUser: Map<string, Course>,
        gradeCategoriesForUser: Map<string, GradeCategory>,
    ) => {
        return generateData(courses, gradeCategories);
    },
);

export const getAnalysisGridDataForUser = createSelector(
    [getCoursesForUser, getGradeCategoriesForUser],
    (
        coursesForUser: Map<string, Course>,
        gradeCategoriesForUser: Map<string, GradeCategory>,
    ) => {
        return generateData(coursesForUser, gradeCategoriesForUser);
    },
);

const generateData = (courses: Map<string, Course>, gradeCategories: Map<string, GradeCategory>) => {
    let retList: List<DataGridElement> = List();

    courses.forEach((course: Course) => {
        let currentTotal = 0;
        let guarenteedTotal = 0;
        let potentialTotal = 0;
        const categories = gradeCategories.filter((g: GradeCategory) => g.courseId === course.id);
        if (categories) {
            categories.forEach((category: GradeCategory) => {
                currentTotal += (category.currentAverage * category.percentage);
                guarenteedTotal += (category.guarenteedAverage * category.percentage);
                potentialTotal += (category.potentialAverage * category.percentage);
            });
            currentTotal /= 100;
            guarenteedTotal /= 100;
            potentialTotal /= 100;
        }
        retList = retList.push(new DataGridElement({
            payload: new AnalysisCourse({
                creditHours: +course.creditHours,
                currentGPA: getGPAFromLetter(getLetterGrade(currentTotal)),
                currentLetter: getLetterGrade(currentTotal),
                guarenteedGPA: getGPAFromLetter(getLetterGrade(guarenteedTotal)),
                guarenteedLetter: getLetterGrade(guarenteedTotal),
                potentialGPA: getGPAFromLetter(getLetterGrade(potentialTotal)),
                potentialLetter: getLetterGrade(potentialTotal),
                title: course.title,
            }),
        }));
    });
    let currentTotalGPA = 0;
    let guarenteedTotalGPA = 0;
    let potentialTotalGPA = 0;
    let creditHoursTotal = 0;
    retList.forEach((value: DataGridElement) => {
        currentTotalGPA += value.payload.currentGPA * +value.payload.creditHours;
        guarenteedTotalGPA += value.payload.guarenteedGPA * +value.payload.creditHours;
        potentialTotalGPA += value.payload.potentialGPA * +value.payload.creditHours;
        creditHoursTotal += +value.payload.creditHours;
    });
    currentTotalGPA /= creditHoursTotal;
    guarenteedTotalGPA /= creditHoursTotal;
    potentialTotalGPA /= creditHoursTotal;
    retList = retList.push(new DataGridElement({
        isBottom: true,
        payload: new AnalysisCourse({
            creditHours: creditHoursTotal,
            currentGPA: currentTotalGPA,
            currentLetter: getLetterFromGPA(currentTotalGPA),
            guarenteedGPA: guarenteedTotalGPA,
            guarenteedLetter: getLetterFromGPA(guarenteedTotalGPA),
            potentialGPA: potentialTotalGPA,
            potentialLetter: getLetterFromGPA(potentialTotalGPA),
            title: "Totals",
        }),
    }));
    return retList;
};
