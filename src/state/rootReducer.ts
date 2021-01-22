import { combineReducers } from "redux";
import { CourseControlReducer, CourseControlState } from "./ducks/control/courses";
import { LoadingMaskReducer, LoadingMaskState } from "./ducks/control/loadingmask/reducers";
import { CourseDataReducer, CourseDataState } from "./ducks/data/courses";
import { GradeCategoryDataReducer, GradeCategoryDataState } from "./ducks/data/gradeCategories/reducers";
import { UserDataReducer, UserDataState } from "./ducks/data/users/reducers";
import { ViewRequestDataReducer, ViewRequestDataState } from "./ducks/data/viewRequests/reducers";

export interface RootState {
    control: {
        course: CourseControlState;
        loadingMask: LoadingMaskState;
    };
    data: {
        course: CourseDataState;
        gradeCategory: GradeCategoryDataState;
        user: UserDataState;
        viewRequest: ViewRequestDataState;
    };
}

export const rootReducer = combineReducers({
    control: combineReducers({
        course: CourseControlReducer,
        loadingMask: LoadingMaskReducer,
    }),
    data: combineReducers({
        course: CourseDataReducer,
        gradeCategory: GradeCategoryDataReducer,
        user: UserDataReducer,
        viewRequest: ViewRequestDataReducer,
    }),
});
