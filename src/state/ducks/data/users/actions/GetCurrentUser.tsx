import { User } from "../../../../../models/User";
import { UserDataActionTypes as types } from "./types";

export interface GetCurrentUser {
    type: types.GET_CURRENT_USER;
}

export const GetCurrentUserCreator = (): GetCurrentUser => ({
    type: types.GET_CURRENT_USER,
});

export interface GetCurrentUserSuccess {
    user: User;
    type: types.GET_CURRENT_USER_SUCCESS;
}

export const GetCurrentUserSuccessCreator = (user: User): GetCurrentUserSuccess => ({
    user,
    type: types.GET_CURRENT_USER_SUCCESS,
});
