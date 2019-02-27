import { generateHeaders } from "src/util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import { CourseDataActionTypes as types, DeleteCourse, DeleteCourseSuccessCreator } from "../actions";
import { CourseFailureActionCreator } from "../actions/CourseFailureAction";

export const DeleteCourseEpic = epicBuilder(
    DeleteCourseSuccessCreator,
    CourseFailureActionCreator,
    types.DELETE_COURSE,
    AjaxMethodType.DELETE,
    (action: DeleteCourse) => `/api/courses/${action.id}`,
    generateHeaders(),
);
