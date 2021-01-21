import { LoginUser, User } from "../../../../../models/User";
import { UserDataActionTypes as types } from "./types";

export interface Login {
    user: LoginUser;
    type: types.LOGIN;
}

export const LoginCreator = (user: LoginUser): Login => ({
    user,
    type: types.LOGIN,
});

export interface LoginSuccess {
    user: User;
    type: types.LOGIN_SUCCESS;
}

export const LoginSuccessCreator = (user: User): LoginSuccess => ({
    user,
    type: types.LOGIN_SUCCESS,
});
