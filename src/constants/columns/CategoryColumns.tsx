import { List } from "immutable";
import { DataGridColumnDefinition } from "../../views/controls/data-grid/models/DataGridColumnDefinition";

export const categoryColumns: List<DataGridColumnDefinition> = List([
    new DataGridColumnDefinition({
        field: "title",
        label: "Category Name",
        width: 300,
    }),
    new DataGridColumnDefinition({
        field: "percentage",
        label: "Percentage",
        width: 100,
    }),
    new DataGridColumnDefinition({
        field: "numberOfGrades",
        label: "Number of Grades",
        width: 200,
    }),
    new DataGridColumnDefinition({
        field: "remainingGrades",
        label: "Grades Remaining",
        width: 180,
    }),
    new DataGridColumnDefinition({
        field: "currentAverage",
        label: "Current Average",
        width: 200,
    }),
    new DataGridColumnDefinition({
        field: "guarenteedAverage",
        label: "Guarenteed Average",
        width: 200,
    }),
    new DataGridColumnDefinition({
        field: "potentialAverage",
        label: "Potential Average",
        width: 200,
    }),
]);
