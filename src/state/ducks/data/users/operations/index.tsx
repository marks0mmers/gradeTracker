import { combineEpics } from "redux-observable";
import { CreateNewUserEpic } from "./CreateNewUserEpic";
import { GetCurrentUserEpic } from "./GetCurrentUserEpic";
import { LoginEpic } from "./LoginEpic";

export const UserDataEpics = combineEpics(
    CreateNewUserEpic,
    LoginEpic,
    GetCurrentUserEpic,
);
