import { combineReducers } from "redux";
import { CourseControlReducer, CourseControlState } from "./ducks/control/courses";
import {  CourseDataReducer, CourseDataState } from "./ducks/data/courses";
import { GradeCategoryDataReducer, GradeCategoryDataState } from "./ducks/data/gradeCategories/reducers";
import { UserDataReducer, UserDataState } from "./ducks/data/users/reducers";
import { SessionReducer, SessionState } from "./ducks/session/reducers";

interface ControlState {
    course: CourseControlState;
}

interface DataState {
    course: CourseDataState;
    gradeCategory: GradeCategoryDataState;
    user: UserDataState;
}

export interface RootState {
    control: ControlState;
    data: DataState;
    session: SessionState;
}

export const rootReducer = combineReducers({
    control: combineReducers<ControlState>({
        course: CourseControlReducer,
    }),
    data: combineReducers<DataState>({
        course: CourseDataReducer,
        gradeCategory: GradeCategoryDataReducer,
        user: UserDataReducer,
    }),
    session: SessionReducer,
});
