import { Map, Record } from "immutable";
import { Course } from "../../../../models/Course";
import { GradeCategory } from "../../../../models/GradeCategory";
import {
    CourseDataActions,
    CourseDataActionTypes as types,
} from "./";

export const CourseDataStateRecord = Record({
    courses: Map(),
});

export class CourseDataState extends CourseDataStateRecord {
    public courses: Map<string, Course>;
}

export const CourseDataReducer = (
    state = new CourseDataState(),
    action: CourseDataActions,
) => {
    switch (action.type) {
        case (types.ADD_GRADE_TO_CATEGORY):
            const courseToUpdate = state.courses.get(action.courseTitle);
            const newCourse = new Course({
                categories: courseToUpdate.categories &&
                    courseToUpdate.categories.set(action.updatedCategory.title, action.updatedCategory),
                creditHours: courseToUpdate.creditHours,
                description: courseToUpdate.description,
                section: courseToUpdate.section,
                title: courseToUpdate.title,
            });
            return state.set("courses", state.courses.set(newCourse.title, newCourse));
        case (types.DELETE_GRADE_FROM_CATEGORY):
            const courseToUpdate2 = state.courses.get(action.courseTitle);
            const categoryToUpdate2 = courseToUpdate2.categories && courseToUpdate2.categories
                .get(action.categoryTitle);
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
                    courseToUpdate2.categories.set(updatedCategory.title, updatedCategory),
                creditHours: courseToUpdate2.creditHours,
                description: courseToUpdate2.description,
                section: courseToUpdate2.section,
                title: courseToUpdate2.title,
            });
            return state.set("courses", state.courses.set(newCourse2.title, newCourse2));
        case (types.DELETE_CATEGORY):
            const courseToUpdate4 = state.courses.get(action.courseTitle);
            const newCourse4 = new Course({
                    categories: courseToUpdate4.categories
                        && courseToUpdate4.categories.delete(action.categoryTitle),
                    creditHours: courseToUpdate4.creditHours,
                    description: courseToUpdate4.description,
                    section: courseToUpdate4.section,
                    title: courseToUpdate4.title,
                });
            return state.set("courses", state.courses.set(newCourse4.title, newCourse4));
        case (types.DELETE_COURSE):
            return state.set("courses", state.courses.delete(action.courseTitle));
        case (types.CREATE_COURSE):
            return state.set("courses", state.courses.set(action.course.title, action.course));
        case (types.CREATE_CATEGORY):
            const courseToUpdate3 = new Course({
                categories: action.course.categories
                    && action.course.categories.set(action.category.title, action.category),
                creditHours: action.course.creditHours,
                description: action.course.description,
                section: action.course.section,
                title: action.course.title,
            });
            return state.set("courses", state.courses.set(courseToUpdate3.title, courseToUpdate3));
        case (types.SET_COURSES):
            return state.set("courses", action.courses);
        case (types.CLEAR_COURSES):
            return state.set("courses", Map());
        case (types.UPDATE_CATEGORY):
            const courseToUpdate5 = state.courses.get(action.courseTitle);
            const newCourse5 = new Course({
                categories: courseToUpdate5.categories &&
                    courseToUpdate5.categories
                        .delete(action.originalCategory.title)
                        .set(action.updatedCategory.title, action.updatedCategory),
                creditHours: courseToUpdate5.creditHours,
                description: courseToUpdate5.description,
                section: courseToUpdate5.section,
                title: courseToUpdate5.title,
            });
            return state.set("courses", state.courses.set(newCourse5.title, newCourse5));
        case (types.UPDATE_COURSE):
            return state.set(
                "courses",
                state.courses
                    .delete(action.originalCourseTitle)
                    .set(action.updatedCourse.title, action.updatedCourse),
            );
        default:
            return state;
    }
};
