import { RouterState } from "connected-react-router";
import { combineReducers } from "redux";
import { CourseControlReducer, CourseControlState } from "./ducks/control/courses";
import {  CourseDataReducer, CourseDataState } from "./ducks/data/courses";
import { SessionReducer, SessionState } from "./ducks/session/reducers";

// tslint:disable-next-line:interface-name
export interface RootState {
    router: RouterState;
    control: {
        course: CourseControlState;
    };
    data: {
        course: CourseDataState;
    };
    session: SessionState;
}

export const rootReducer = combineReducers({
    control: combineReducers({
        course: CourseControlReducer,
    }),
    data: combineReducers({
        course: CourseDataReducer,
    }),
    session: SessionReducer,
});
