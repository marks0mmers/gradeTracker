import { UserDataActionTypes as types } from "./types";

export interface Logout {
    type: types.LOGOUT;
}

export const LogoutCreator = (): Logout => ({
    type: types.LOGOUT,
});
