import { Map, Record } from "immutable";
import { Theme } from "../../../models/Theme";
import { darkTheme } from "../../../views/themes/darkTheme";
import { lightTheme } from "../../../views/themes/lightTheme";
import { SessionActions } from "./actions";
import { SessionActionTypes as types } from "./actions";

const SessionStateRecord = Record({
    activeTheme: darkTheme,
    themes: Map({
        dark: darkTheme,
        light: lightTheme,
    }),
});

export class SessionState extends SessionStateRecord {
    public activeTheme: Theme;
    public themes: Map<string, Theme>;
}

export const SessionReducer = (
    state = new SessionState(),
    action: SessionActions,
) => {
    switch (action.type) {
        case (types.SET_ACTIVE_THEME):
            return state.set("activeTheme", action.theme);
        default:
            return state;
    }
};
