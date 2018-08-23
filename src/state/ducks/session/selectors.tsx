import { RootState } from "../../rootReducer";

export const getActiveTheme = (state: RootState) => state.session.activeTheme;
export const getThemes = (state: RootState) => state.session.themes;
export const getFilePath = (state: RootState) => state.session.filePath;
export const getFileName = (state: RootState) => state.session.fileName;
