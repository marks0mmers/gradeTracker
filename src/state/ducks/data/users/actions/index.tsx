import { CreateNewUser, CreateNewUserSuccess } from "./CreateNewUser";
import { GetCurrentUser, GetCurrentUserSuccess } from "./GetCurrentUser";
import { Login, LoginSuccess } from "./Login";
import { Logout } from "./Logout";

export * from "./types";
export * from "./CreateNewUser";
export * from "./Login";
export * from "./Logout";
export * from "./UserFailureAction";
export * from "./GetCurrentUser";

export type UserDataActions =
    CreateNewUser |
    CreateNewUserSuccess |
    GetCurrentUser |
    GetCurrentUserSuccess |
    Login |
    LoginSuccess |
    Logout;
