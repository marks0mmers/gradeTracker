import { Record } from "immutable";
import { User } from "../../../../models/User";
import { Toast } from "../../../../util/Toast";
import { UserDataActions, UserDataActionTypes as types } from "./actions";

export const UserDataStateRecord = Record({
    currentUser: undefined,
});

export class UserDataState extends UserDataStateRecord {
    public currentUser?: User;
}

export const UserDataReducer = (
    state = new UserDataState(),
    action: UserDataActions,
) => {
    switch (action.type) {
        case (types.CREATE_NEW_USER_SUCCESS):
            Toast.success("User Successfully Created");
            return state;
        case (types.GET_CURRENT_USER_SUCCESS):
            return state.set("currentUser", action.user);
        case (types.LOGIN_SUCCESS):
            return state.set("currentUser", action.user);
        case (types.LOGOUT):
            sessionStorage.removeItem("jwtToken");
            return state.set("currentUser", undefined);
        default:
            return state;
    }
};
