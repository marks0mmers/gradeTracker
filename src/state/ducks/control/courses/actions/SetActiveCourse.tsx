import { CourseControlActionTypes as types } from ".";

export interface SetActiveCourse {
    title?: string;
    type: types.SET_ACTIVE_COURSE;
}

export const SetActiveCourseCreator = (title: string | undefined) => ({
    title,
    type: types.SET_ACTIVE_COURSE,
});
