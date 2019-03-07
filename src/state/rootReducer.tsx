import { RouterState } from "connected-react-router";
import { combineReducers } from "redux";
import { AnalysisControlReducer, AnalysisControlState } from "./ducks/control/analysis/reducers";
import { CourseControlReducer, CourseControlState } from "./ducks/control/courses";
import {  CourseDataReducer, CourseDataState } from "./ducks/data/courses";
import { GradeCategoryDataReducer, GradeCategoryDataState } from "./ducks/data/gradeCategories/reducers";
import { UserDataReducer, UserDataState } from "./ducks/data/users/reducers";
import { SessionReducer, SessionState } from "./ducks/session/reducers";

export interface RootState {
    control: {
        analysis: AnalysisControlState;
        course: CourseControlState;
    };
    data: {
        course: CourseDataState;
        gradeCategory: GradeCategoryDataState;
        user: UserDataState;
    };
    session: SessionState;
    router: RouterState;
}

export const rootReducer = combineReducers({
    control: combineReducers({
        analysis: AnalysisControlReducer,
        course: CourseControlReducer,
    }),
    data: combineReducers({
        course: CourseDataReducer,
        gradeCategory: GradeCategoryDataReducer,
        user: UserDataReducer,
    }),
    session: SessionReducer,
});
