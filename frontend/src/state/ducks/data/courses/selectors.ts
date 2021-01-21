import { RootState } from "../../../rootReducer";

export const getCourses = (state: RootState) => state.data.course.courses;
export const getCoursesForUser = (state: RootState) => state.data.course.coursesForUser;
