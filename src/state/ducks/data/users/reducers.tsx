import { List, Map, Record } from "immutable";
import { User } from "../../../../models/User";
import { Toast } from "../../../../util/Toast";
import { UserDataActions, UserDataActionTypes as types } from "./actions";

export const UserDataStateRecord = Record({
    currentUser: undefined,
    users: Map<string, User>(),
});

export class UserDataState extends UserDataStateRecord {
    public currentUser?: User;
    public users: Map<string, User>;
}

export const UserDataReducer = (
    state = new UserDataState(),
    action: UserDataActions,
): UserDataState => {
    switch (action.type) {
        case (types.CREATE_NEW_USER_SUCCESS):
            Toast.success("User Successfully Created");
            return state;
        case (types.GET_CURRENT_USER_SUCCESS):
            return state.set("currentUser", action.user) as UserDataState;
        case (types.LOGIN_SUCCESS):
            sessionStorage.setItem("jwtToken", action.user.token || "");
            return state.set("currentUser", action.user) as UserDataState;
        case (types.LOGOUT):
            sessionStorage.removeItem("jwtToken");
            return state.set("currentUser", undefined) as UserDataState;
        case (types.GET_USERS_SUCCESS):
            return state.set("users", List<User>(action.users).reduce(
                (users: Map<string, User>, user: User) => users.set(user._id, new User(user)),
                Map(),
            )) as UserDataState;
        default:
            return state;
    }
};
