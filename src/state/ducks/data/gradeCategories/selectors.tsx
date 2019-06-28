import { RootState } from "../../../../state/rootReducer";

export const getGradeCategories = (state: RootState) => state.data.gradeCategory.gradeCategories;
export const getGradeCategoriesForUser = (state: RootState) => state.data.gradeCategory.gradeCategoriesForUser;
