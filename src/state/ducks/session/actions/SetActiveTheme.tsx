import { Theme } from "../../../../models/Theme";
import { SessionActionTypes as types } from "./types";

export interface SetActiveTheme {
    theme: Theme;
    type: types.SET_ACTIVE_THEME;
}

export const SetActiveThemeCreator = (theme: Theme) => ({
    theme,
    type: types.SET_ACTIVE_THEME,
});
