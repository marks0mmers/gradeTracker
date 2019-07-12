import { generateHeaders } from "../../../../../util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import { CourseDataActionTypes as types, CreateNewCourse, CreateNewCourseSuccessCreator } from "../actions";
import { CourseFailureActionCreator } from "../actions/CourseFailureAction";

export const CreateNewCourseEpic = epicBuilder(
    CreateNewCourseSuccessCreator,
    CourseFailureActionCreator,
    types.CREATE_NEW_COURSE,
    AjaxMethodType.POST,
    (action: CreateNewCourse) => "/api/courses",
    generateHeaders(),
    (action: CreateNewCourse) => action.course.toJS(),
);
