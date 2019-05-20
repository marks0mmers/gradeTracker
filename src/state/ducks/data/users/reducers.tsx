import { List, Map, Record, RecordOf } from "immutable";
import { User } from "../../../../models/User";
import { Toast } from "../../../../util/Toast";
import { UserDataActions, UserDataActionTypes as types } from "./actions";

interface IUserDataState {
    currentUser?: User;
    users: Map<string, User>;
}

export const UserDataState = Record<IUserDataState>({
    currentUser: undefined,
    users: Map<string, User>(),
});

export type UserDataState = RecordOf<IUserDataState>;

export const UserDataReducer = (
    state = new UserDataState(),
    action: UserDataActions,
): UserDataState => {
    switch (action.type) {
        case (types.CREATE_NEW_USER_SUCCESS):
            Toast.success("User Successfully Created");
            return state;
        case (types.GET_CURRENT_USER_SUCCESS):
            return state.set("currentUser", action.user);
        case (types.LOGIN_SUCCESS):
            sessionStorage.setItem("jwtToken", action.user.token || "");
            return state.set("currentUser", action.user);
        case (types.LOGOUT):
            sessionStorage.removeItem("jwtToken");
            return state.set("currentUser", undefined);
        case (types.GET_USERS_SUCCESS):
            return state.set("users", List<User>(action.users).reduce(
                (users: Map<string, User>, user: User) => users.set(user._id, new User(user)),
                Map(),
            ));
        default:
            return state;
    }
};
