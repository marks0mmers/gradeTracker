import { UserDataActionTypes as types } from "./types";

export interface UserFailureAction {
    err: Error;
    type: types.USER_FAILURE_ACTION;
}

export const UserFailureActionCreator = (err: Error): UserFailureAction => ({
    err,
    type: types.USER_FAILURE_ACTION,
});
