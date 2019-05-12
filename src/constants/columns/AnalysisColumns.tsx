import { List } from "immutable";
import { AnalysisCourse } from "../../models/AnalysisCourse";
import { DataGridColumnDefinition } from "../../views/controls/data-grid/models/DataGridColumnDefinition";
import { defaultFormatter } from "../../views/controls/data-grid/util/Formatters";

export const analysisColumns: List<DataGridColumnDefinition<AnalysisCourse>> = List([
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
