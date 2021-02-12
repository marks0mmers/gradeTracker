import { List } from "immutable";
import { User } from "../../../../../models/User";
import { UserDataActionTypes as types } from "./types";

export interface GetUsers {
    type: types.GET_USERS;
}

export const GetUsersCreator = (): GetUsers => ({
    type: types.GET_USERS,
});

export interface GetUsersSuccess {
    users: List<User>;
    type: types.GET_USERS_SUCCESS;
}

export const GetUsersSuccessCreator = (users: List<User>): GetUsersSuccess => ({
    users,
    type: types.GET_USERS_SUCCESS,
});
