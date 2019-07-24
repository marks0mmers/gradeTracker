import { AnyAction } from "redux";
import { ofType } from "redux-observable";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { CourseDataActionTypes } from "../../data/courses/actions/types";
import { UserDataActionTypes } from "../../data/users/actions/types";
import { HideLoadingMaskCreator, ShowLoadingMaskCreator } from "./actions";
import { GradeCategoryDataActionTypes } from "../../data/gradeCategories/actions/types";

export const ShowLoadingMaskEpic = (
    action$: Observable<AnyAction>,
) => action$.pipe(
    ofType<AnyAction>(
        UserDataActionTypes.CREATE_NEW_USER,
        UserDataActionTypes.GET_CURRENT_USER,
        UserDataActionTypes.GET_USERS,
        UserDataActionTypes.LOGIN,
        CourseDataActionTypes.CREATE_NEW_COURSE,
        CourseDataActionTypes.DELETE_COURSE,
        CourseDataActionTypes.EDIT_COURSE,
        CourseDataActionTypes.GET_COURSES_CURRENT_USER,
        GradeCategoryDataActionTypes.CREATE_GRADE,
        GradeCategoryDataActionTypes.CREATE_GRADE_CATEGORY,
        GradeCategoryDataActionTypes.DELETE_GRADE,
        GradeCategoryDataActionTypes.DELETE_GRADE_CATEGORY,
        GradeCategoryDataActionTypes.EDIT_GRADE,
        GradeCategoryDataActionTypes.EDIT_GRADE_CATEGORY,
        GradeCategoryDataActionTypes.GET_GRADE_CATEGORIES_FOR_COURSE,
        GradeCategoryDataActionTypes.GET_GRADE_CATEGORIES_FOR_CURRENT_USER,
    ),
    mergeMap(() => of(ShowLoadingMaskCreator())),
);

export const HideLoadingMaskEpic = (
    action$: Observable<AnyAction>,
) => action$.pipe(
    ofType<AnyAction>(
        UserDataActionTypes.CREATE_NEW_USER_SUCCESS,
        UserDataActionTypes.GET_CURRENT_USER_SUCCESS,
        UserDataActionTypes.GET_USERS_SUCCESS,
        UserDataActionTypes.LOGIN_SUCCESS,
        UserDataActionTypes.USER_FAILURE_ACTION,
        CourseDataActionTypes.CREATE_NEW_COURSE_SUCCESS,
        CourseDataActionTypes.DELETE_COURSE_SUCCESS,
        CourseDataActionTypes.EDIT_COURSE_SUCCESS,
        CourseDataActionTypes.GET_COURSES_CURRENT_USER_SUCCESS,
        CourseDataActionTypes.COURSE_FAILURE_ACTION,
        GradeCategoryDataActionTypes.CREATE_GRADE_SUCCESS,
        GradeCategoryDataActionTypes.CREATE_GRADE_CATEGORY_SUCCESS,
        GradeCategoryDataActionTypes.DELETE_GRADE_SUCCESS,
        GradeCategoryDataActionTypes.DELETE_GRADE_CATEGORY_SUCCESS,
        GradeCategoryDataActionTypes.EDIT_GRADE_SUCCESS,
        GradeCategoryDataActionTypes.EDIT_GRADE_CATEGORY_SUCCESS,
        GradeCategoryDataActionTypes.GET_GRADE_CATEGORIES_FOR_COURSE_SUCCESS,
        GradeCategoryDataActionTypes.GET_GRADE_CATEGORIES_FOR_CURRENT_USER_SUCCESS,
        GradeCategoryDataActionTypes.GRADE_CATEGORY_FAILURE_ACTION,
    ),
    mergeMap(() => of(HideLoadingMaskCreator())),
);
