import { generateHeaders } from "../../../../../util/GenerateHeaders";
import { AjaxMethodType, epicBuilder } from "../../common/EpicBuilder";
import {
    CreateNewUser,
    CreateNewUserSuccessCreator,
    UserDataActionTypes as types,
    UserFailureActionCreator,
} from "../actions";

export const CreateNewUserEpic = epicBuilder(
    CreateNewUserSuccessCreator,
    UserFailureActionCreator,
    types.CREATE_NEW_USER,
    AjaxMethodType.POST,
    (action: CreateNewUser) => "/api/users",
    generateHeaders(),
    (action: CreateNewUser) => action.user.toJS(),
);
