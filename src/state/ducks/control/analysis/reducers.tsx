import { List, Record } from "immutable";
import { AnalysisCourse } from "../../../../models/AnalysisCourse";
import { DataGridColumnDefinition, defaultFormatter } from "../../../../views/controls/data-grid";

const visibleColumns: List<DataGridColumnDefinition<AnalysisCourse>> = List([
    new DataGridColumnDefinition({
        formatter: defaultFormatter((course: AnalysisCourse) => course.title),
        label: "Course Title",
        width: 300,
    }),
    new DataGridColumnDefinition({
        formatter: defaultFormatter((course: AnalysisCourse) => course.creditHours),
        label: "Credit Hours",
        width: 150,
    }),
    new DataGridColumnDefinition({
        formatter: defaultFormatter((course: AnalysisCourse) =>
            `${course.currentGPA.toPrecision(3)} (${course.currentLetter})`),
        label: "Curr. GPA",
        width: 100,
    }),
    new DataGridColumnDefinition({
        formatter: defaultFormatter((course: AnalysisCourse) =>
            `${course.guarenteedGPA.toPrecision(3)} (${course.guarenteedLetter})`),
        label: "Guar. GPA",
        width: 100,
    }),
    new DataGridColumnDefinition({
        formatter: defaultFormatter((course: AnalysisCourse) =>
            `${course.potentialGPA.toPrecision(3)} (${course.potentialLetter})`),
        label: "Potn. GPA",
        width: 100,
    }),
]);

export const AnalysisControlStateRecord = Record({
    visibleColumns,
});

export class AnalysisControlState extends AnalysisControlStateRecord {
    public visibleColumns: List<DataGridColumnDefinition<AnalysisCourse>>;
}

export const AnalysisControlReducer = (
    state = new AnalysisControlState(),
) => {
    return state;
};
