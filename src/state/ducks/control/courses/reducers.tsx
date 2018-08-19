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
        formatter: gradeFormatter((category: GradeCategory) =>
            category.currentAverage && category.currentAverage.toPrecision(4)),
        label: "Current Average",
        width: 200,
    }),
    new DataGridColumnDefinition({
        formatter: gradeFormatter((category: GradeCategory) =>
            category.guarenteedAverage && category.guarenteedAverage.toPrecision(4)),
        label: "Guarenteed Average",
        width: 200,
    }),
    new DataGridColumnDefinition({
        formatter: gradeFormatter((category: GradeCategory) =>
            category.potentialAverage && category.potentialAverage.toPrecision(4)),
        label: "Potential Average",
        width: 200,
    }),
]);

export const CourseControlStateRecord = Record({
    activeCourse: undefined,
    createFormValues: Map(),
    detailedColumns,
    selectedGradeCategory: undefined,
});

export class CourseControlState extends CourseControlStateRecord {
    public activeCourse: string;
    public detailedColumns: List<DataGridColumnDefinition<GradeCategory>>;
    public selectedGradeCategory: string;
}

export const CourseControlReducer = (
    state = new CourseControlState(),
    action: CourseControlActions,
) => {
    switch (action.type) {
        case (types.SELECT_GRADE_CATEGORY):
            return state.set("selectedGradeCategory", action.gradeCategory);
        case (types.SET_ACTIVE_COURSE):
            return state.set("activeCourse", action.title);
        default:
            return state;
    }
};
