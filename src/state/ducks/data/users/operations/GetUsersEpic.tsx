import { generateHeaders } from "../../../../../util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import { GetUsersSuccessCreator, UserDataActionTypes, UserFailureActionCreator } from "../actions";

export const GetUsersEpic = epicBuilder(
    GetUsersSuccessCreator,
    UserFailureActionCreator,
    UserDataActionTypes.GET_USERS,
    AjaxMethodType.GET,
    () => "/api/users",
    generateHeaders(),
);
