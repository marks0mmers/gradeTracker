import { List, Record } from "immutable";
import { Course } from "../../../../models/Course";
import { GradeCategory } from "../../../../models/GradeCategory";
import {
    CourseDataActions,
    CourseDataActionTypes as types,
} from "./";

export const CourseDataStateRecord = Record({
    courses: List(),
});

export class CourseDataState extends CourseDataStateRecord {
    public courses: List<Course>;
}

export const CourseDataReducer = (
    state = new CourseDataState(),
    action: CourseDataActions,
) => {
    switch (action.type) {
        case (types.ADD_GRADE_TO_CATEGORY):
            const courseToUpdate = state.courses.find((value: Course) => value.title === action.courseTitle);
            const courseIndex = state.courses.indexOf(courseToUpdate);
            const categoryToUpdate = courseToUpdate.categories && courseToUpdate.categories
                .find((category: GradeCategory) => category.title === action.updatedCategory.title);
            const categoryIndex = courseToUpdate.categories &&
                courseToUpdate.categories.indexOf(categoryToUpdate || new GradeCategory());
            const newCourse = new Course({
                categories: courseToUpdate.categories &&
                    courseToUpdate.categories.set(categoryIndex || 0, action.updatedCategory),
                creditHours: courseToUpdate.creditHours,
                description: courseToUpdate.description,
                section: courseToUpdate.section,
                title: courseToUpdate.title,
            });
            return state.set("courses", state.courses.set(courseIndex, newCourse));
        case (types.DELETE_GRADE_FROM_CATEGORY):
            const courseToUpdate2 = state.courses.find((value: Course) => value.title === action.courseTitle);
            const courseIndex2 = state.courses.indexOf(courseToUpdate2);
            const categoryToUpdate2 = courseToUpdate2.categories && courseToUpdate2.categories
                .find((category: GradeCategory) => category.title === action.categoryTitle);
            const categoryIndex2 = courseToUpdate2.categories &&
                courseToUpdate2.categories.indexOf(categoryToUpdate2 || new GradeCategory());
            const updatedGrades = categoryToUpdate2 && categoryToUpdate2.grades.delete(action.gradeName);
            const updatedCategory = categoryToUpdate2 && new GradeCategory({
                grades: updatedGrades,
                numberOfGrades: categoryToUpdate2.numberOfGrades,
                percentage: categoryToUpdate2.percentage,
                remainingGrades: categoryToUpdate2.remainingGrades,
                title: categoryToUpdate2.title,
            });
            const newCourse2 = new Course({
                categories: courseToUpdate2.categories && updatedCategory &&
                    courseToUpdate2.categories.set(categoryIndex2 || 0, updatedCategory),
                creditHours: courseToUpdate2.creditHours,
                description: courseToUpdate2.description,
                section: courseToUpdate2.section,
                title: courseToUpdate2.title,
            });
            return state.set("courses", state.courses.set(courseIndex2, newCourse2));
        case (types.DELETE_CATEGORY):
            const courseToUpdate4 = state.courses.find((value: Course) => value.title === action.courseTitle);
            const courseIndex4 = state.courses.indexOf(courseToUpdate4);
            const categoryToUpdate4 = courseToUpdate4.categories && courseToUpdate4.categories
                .find((category: GradeCategory) => category.title === action.categoryTitle);
            const categoryIndex4 = courseToUpdate4.categories &&
                courseToUpdate4.categories.indexOf(categoryToUpdate4 || new GradeCategory());
            const newCourse4 = new Course({
                    categories: courseToUpdate4.categories && courseToUpdate4.categories.delete(categoryIndex4 || 0),
                    creditHours: courseToUpdate4.creditHours,
                    description: courseToUpdate4.description,
                    section: courseToUpdate4.section,
                    title: courseToUpdate4.title,
                });
            return state.set("courses", state.courses.set(courseIndex4, newCourse4));
        case (types.DELETE_COURSE):
            const courseToDelete = state.courses.find((value: Course) => value.title === action.courseTitle);
            const indexOfCourse = state.courses.indexOf(courseToDelete);
            return state.set("courses", state.courses.delete(indexOfCourse));
        case (types.CREATE_COURSE):
            return state.set("courses", state.courses.push(action.course));
        case (types.CREATE_CATEGORY):
            const courseIndex3 = state.courses.indexOf(action.course);
            const courseToUpdate3 = new Course({
                categories: action.course.categories && action.course.categories.insert(0, action.category),
                creditHours: action.course.creditHours,
                description: action.course.description,
                section: action.course.section,
                title: action.course.title,
            });
            return state.set("courses", state.courses.set(courseIndex3, courseToUpdate3));
        case (types.SET_COURSES):
            return state.set("courses", action.courses);
        case (types.CLEAR_COURSES):
            return state.set("courses", List());
        case (types.UPDATE_CATEGORY):
            const courseToUpdate5 = state.courses.find((value: Course) => value.title === action.courseTitle);
            const courseIndex5 = state.courses.indexOf(courseToUpdate5);
            const categoryIndex5 = courseToUpdate5.categories &&
                courseToUpdate5.categories.indexOf(action.originalCategory);
            const newCourse5 = new Course({
                categories: courseToUpdate5.categories &&
                    courseToUpdate5.categories.set(categoryIndex5 || 0, action.updatedCategory),
                creditHours: courseToUpdate5.creditHours,
                description: courseToUpdate5.description,
                section: courseToUpdate5.section,
                title: courseToUpdate5.title,
            });
            return state.set("courses", state.courses.set(courseIndex5, newCourse5));
        case (types.UPDATE_COURSE):
            const courseToUpdate6 = state.courses.find((value: Course) => value.title === action.originalCourseTitle);
            const courseIndex6 = state.courses.indexOf(courseToUpdate6);
            return state.set("courses", state.courses.set(courseIndex6, action.updatedCourse));
        default:
            return state;
    }
};
