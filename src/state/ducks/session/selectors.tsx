import { RootState } from "../../rootReducer";

export const getActiveTheme = (state: RootState) => {
    return state.session.activeTheme;
};

export const getThemes = (state: RootState) => {
    return state.session.themes;
};
