import { Map, Record } from "immutable";
import { Theme } from "../../../models/Theme";
import { darkTheme } from "../../../views/themes/darkTheme";
import { lightTheme } from "../../../views/themes/lightTheme";
import { SessionActions } from "./actions";
import { SessionActionTypes as types } from "./actions";

const SessionStateRecord = Record({
    activeTheme: darkTheme,
    fileName: "",
    filePath: "",
    themes: Map({
        Dark: darkTheme,
        Light: lightTheme,
    }),
});

export class SessionState extends SessionStateRecord {
    public activeTheme: Theme;
    public themes: Map<string, Theme>;
    public filePath: string;
    public fileName: string;
}

export const SessionReducer = (
    state = new SessionState(),
    action: SessionActions,
) => {
    switch (action.type) {
        case (types.SET_ACTIVE_THEME):
            return state.set("activeTheme", action.theme);
        case (types.SET_ACTIVE_FILE):
            return state
                .set("filePath", action.path)
                .set("fileName", action.fileName);
        default:
            return state;
    }
};
