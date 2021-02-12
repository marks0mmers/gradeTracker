import { generateHeaders } from "../../../../../util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import { EditCourse, EditCourseSuccessCreator , CourseDataActionTypes as types} from "../actions";
import { CourseFailureActionCreator } from "../actions/CourseFailureAction";

export const EditCourseEpic = epicBuilder(
    EditCourseSuccessCreator,
    CourseFailureActionCreator,
    types.EDIT_COURSE,
    AjaxMethodType.PUT,
    (action: EditCourse) => `/api/courses/${action.course.id}`,
    generateHeaders(),
    (action: EditCourse) => action.course.toJS(),
);
