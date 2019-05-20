import { List } from "immutable";
import { DataGridColumnDefinition } from "../../views/controls/data-grid/models/DataGridColumnDefinition";

export const analysisColumns: List<DataGridColumnDefinition> = List([
    new DataGridColumnDefinition({
        field: "title",
        label: "Course Title",
        width: 300,
    }),
    new DataGridColumnDefinition({
        field: "creditHours",
        label: "Credit Hours",
        width: 150,
    }),
    new DataGridColumnDefinition({
        field: "currentLetter",
        label: "Curr. GPA",
        width: 100,
    }),
    new DataGridColumnDefinition({
        field: "guarenteedLetter",
        label: "Guar. GPA",
        width: 100,
    }),
    new DataGridColumnDefinition({
        field: "potentialLetter",
        label: "Potn. GPA",
        width: 100,
    }),
]);
