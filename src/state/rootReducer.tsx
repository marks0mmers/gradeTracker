import { RouterState } from "connected-react-router";
import { combineReducers } from "redux";
import { AnalysisControlReducer, AnalysisControlState } from "./ducks/control/analysis/reducers";
import { CourseControlReducer, CourseControlState } from "./ducks/control/courses";
import {  CourseDataReducer, CourseDataState } from "./ducks/data/courses";
import { SessionReducer, SessionState } from "./ducks/session/reducers";

export interface RootState {
    router: RouterState;
    control: {
        analysis: AnalysisControlState;
        course: CourseControlState;
    };
    data: {
        course: CourseDataState;
    };
    session: SessionState;
}

export const rootReducer = combineReducers({
    control: combineReducers({
        analysis: AnalysisControlReducer,
        course: CourseControlReducer,
    }),
    data: combineReducers({
        course: CourseDataReducer,
    }),
    session: SessionReducer,
});
