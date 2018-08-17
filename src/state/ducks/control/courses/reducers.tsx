import { List, Map, Record } from "immutable";
import { GradeCategory } from "../../../../models/GradeCategory";
import { DataGridColumnDefinition } from "../../../../views/controls/data-grid";
import {
    defaultFormatter,
    gradeFormatter,
    percentageFormatter,
} from "../../../../views/controls/data-grid";
import {
    CourseControlActions,
    CourseControlActionTypes as types,
} from "./";

const detailedColumns: List<DataGridColumnDefinition<GradeCategory>> = List([
    new DataGridColumnDefinition({
        formatter: defaultFormatter((category: GradeCategory) => category.title),
        label: "Category Name",
        width: 300,
    }),
    new DataGridColumnDefinition({
        formatter: percentageFormatter((category: GradeCategory) => category.percentage),
        label: "Percentage",
        width: 100,
    }),
    new DataGridColumnDefinition({
        formatter: defaultFormatter((category: GradeCategory) => category.numberOfGrades),
        label: "Number of Grades",
        width: 200,
    }),
    new DataGridColumnDefinition({
        formatter: defaultFormatter((category: GradeCategory) => category.remainingGrades),
        label: "Grades Remaining",
        width: 180,
    }),
    new DataGridColumnDefinition({
        formatter: gradeFormatter((category: GradeCategory) => category.currentAverage),
        label: "Current Average",
        width: 200,
    }),
    new DataGridColumnDefinition({
        formatter: gradeFormatter((category: GradeCategory) => category.guarenteedAverage),
        label: "Guarenteed Average",
        width: 200,
    }),
    new DataGridColumnDefinition({
        formatter: gradeFormatter((category: GradeCategory) => category.potentialAverage),
        label: "Potential Average",
        width: 200,
    }),
]);

export const CourseControlStateRecord = Record({
    activeCourse: undefined,
    createCategoryFormValues: Map(),
    createFormValues: Map(),
    detailedColumns,
    selectedGradeCategory: undefined,
});

export class CourseControlState extends CourseControlStateRecord {
    public activeCourse: string;
    public createFormValues: Map<string, string>;
    public createCategoryFormValues: Map<string, string>;
    public detailedColumns: List<DataGridColumnDefinition<GradeCategory>>;
    public selectedGradeCategory: string;
}

export const CourseControlReducer = (
    state = new CourseControlState(),
    action: CourseControlActions,
) => {
    switch (action.type) {
        case (types.CREATE_COURSE_FORM_CHANGE):
            return state.set("createFormValues", state.createFormValues.set(action.name, action.value));
        case (types.CREATE_COURSE_FORM_CLEAR):
            return state.set("createFormValues", Map());
        case (types.SELECT_GRADE_CATEGORY):
            return state.set("selectedGradeCategory", action.gradeCategory);
        case (types.SET_ACTIVE_COURSE):
            return state.set("activeCourse", action.title);
        case (types.CREATE_CATEGORY_FORM_CHANGE):
            return state.set("createCategoryFormValues", state.createCategoryFormValues.set(action.name, action.value));
        case (types.CREATE_CATEGORY_FORM_CLEAR):
            return state.set("createCategoryFormValues", Map());
        default:
            return state;
    }
};
