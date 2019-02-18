import { User } from "../../../../../models/User";
import { UserDataActionTypes as types } from "./types";

export interface CreateNewUser {
    user: User;
    type: types.CREATE_NEW_USER;
}

export const CreateNewUserCreator = (user: User): CreateNewUser => ({
    user,
    type: types.CREATE_NEW_USER,
});

export interface CreateNewUserSuccess {
    user: User;
    type: types.CREATE_NEW_USER_SUCCESS;
}

export const CreateNewUserSuccessCreator = (user: User): CreateNewUserSuccess => ({
    user,
    type: types.CREATE_NEW_USER_SUCCESS,
});
