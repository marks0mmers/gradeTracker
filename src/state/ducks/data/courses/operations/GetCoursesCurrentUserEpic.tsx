import { generateAuthHeaders } from "../../../../../util/GenerateHeaders";
import { RootState } from "../../../../rootReducer";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import { CourseDataActionTypes as types, GetCoursesCurrentUser, GetCoursesCurrentUserSuccessCreator } from "../actions";
import { CourseFailureActionCreator } from "../actions/CourseFailureAction";

export const GetCoursesCurrentUserEpic = epicBuilder(
    GetCoursesCurrentUserSuccessCreator,
    CourseFailureActionCreator,
    types.GET_COURSES_CURRENT_USER,
    AjaxMethodType.GET,
    (action: GetCoursesCurrentUser, state: RootState) =>
        `/api/courses/user/${state.data.user.currentUser && state.data.user.currentUser._id}`,
    generateAuthHeaders(),
);
