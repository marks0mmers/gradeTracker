import { generateHeaders } from "../../../../../util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    Login,
    LoginSuccessCreator,
    UserDataActionTypes as types,
    UserFailureActionCreator,
} from "../actions";

export const LoginEpic = epicBuilder(
    LoginSuccessCreator,
    UserFailureActionCreator,
    types.LOGIN,
    AjaxMethodType.POST,
    (action: Login) => "/api/users/login",
    generateHeaders(),
    (action: Login) => action.user,
);
