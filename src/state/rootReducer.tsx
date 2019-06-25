import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { CourseControlReducer, CourseControlState } from "./ducks/control/courses";
import {  CourseDataReducer, CourseDataState } from "./ducks/data/courses";
import { GradeCategoryDataReducer, GradeCategoryDataState } from "./ducks/data/gradeCategories/reducers";
import { UserDataReducer, UserDataState } from "./ducks/data/users/reducers";

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
    router: RouterState;
}

export const rootReducer = (history: History) => combineReducers({
    control: combineReducers<ControlState>({
        course: CourseControlReducer,
    }),
    data: combineReducers<DataState>({
        course: CourseDataReducer,
        gradeCategory: GradeCategoryDataReducer,
        user: UserDataReducer,
    }),
    router: connectRouter(history),
});
