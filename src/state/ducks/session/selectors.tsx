import { RootState } from "../../rootReducer";

export const getActiveTheme = (state: RootState) => state.session.activeTheme;
export const getThemes = (state: RootState) => state.session.themes;
