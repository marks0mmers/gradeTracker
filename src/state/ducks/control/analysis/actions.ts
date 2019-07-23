import { AnalysisControlActionTypes as types } from "./types";

export interface ViewAnalysisForUser {
    userId: string;
    type: types.VIEW_ANALYSIS_FOR_USER;
}

export const ViewAnalysisForUserCreator = (userId: string): ViewAnalysisForUser => ({
    userId,
    type: types.VIEW_ANALYSIS_FOR_USER,
});

export type AnalysisControlActions =
    ViewAnalysisForUser;
