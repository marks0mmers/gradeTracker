import { SessionActionTypes as types } from "./types";

export interface SetActiveFile {
    fileName: string;
    path: string;
    type: types.SET_ACTIVE_FILE;
}

export const SetActiveFileCreator = (fileName: string, path: string) => ({
    fileName,
    path,
    type: types.SET_ACTIVE_FILE,
});
