import { RootState } from "../../../../state/rootReducer";

export const getGradeCategories = (state: RootState) => state.data.gradeCategory.gradeCategories;
