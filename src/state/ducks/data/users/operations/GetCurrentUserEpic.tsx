import { generateHeaders } from "../../../../../util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    GetCurrentUser,
    GetCurrentUserSuccessCreator,
    UserDataActionTypes as types,
    UserFailureActionCreator,
} from "../actions";

export const GetCurrentUserEpic = epicBuilder(
    GetCurrentUserSuccessCreator,
    UserFailureActionCreator,
    types.GET_CURRENT_USER,
    AjaxMethodType.GET,
    (action: GetCurrentUser) => "/api/users/current",
    generateHeaders(),
);
