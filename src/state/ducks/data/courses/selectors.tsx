import { RootState } from "../../../rootReducer";

export const getCourses = (state: RootState) => state.data.course.courses;
