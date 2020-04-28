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
            localStorage.setItem("jwtToken", action.user.token ?? "");
            return state.set("currentUser", action.user);
        case (types.LOGOUT):
            localStorage.removeItem("jwtToken");
            return state.set("currentUser", undefined);
        case (types.GET_USERS_SUCCESS):
            return state.set("users", List(action.users)
                .map(u => new User(u))
                .toMap()
                .mapKeys((_, u) => u._id)
                .toMap());
        default:
            return state;
    }
};
