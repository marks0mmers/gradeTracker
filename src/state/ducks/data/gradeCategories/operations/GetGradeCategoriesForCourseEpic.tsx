import { generateHeaders } from "src/util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    GetGradeCategoryForCourse,
    GetGradeCategoryForCourseSuccessCreator,
    GradeCategoryDataActionTypes as types,
    GradeCategoryFailureActionCreator,
} from "../actions";

export const GetGradeCategoriesForCourseEpic = epicBuilder(
    GetGradeCategoryForCourseSuccessCreator,
    GradeCategoryFailureActionCreator,
    types.GET_GRADE_CATEGORIES_FOR_COURSE,
    AjaxMethodType.GET,
    (action: GetGradeCategoryForCourse) => `/api/gradeCategories/course/${action.courseId}`,
    generateHeaders(),
);
