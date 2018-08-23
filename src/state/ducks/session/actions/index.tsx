import { SetActiveFile, SetActiveFileCreator } from "./SetActiveFile";
import { SetActiveTheme, SetActiveThemeCreator } from "./SetActiveTheme";
export * from "./types";

export {
    SetActiveFile,
    SetActiveTheme,
};

export {
    SetActiveFileCreator,
    SetActiveThemeCreator,
};

export type SessionActions =
    SetActiveFile |
    SetActiveTheme;
