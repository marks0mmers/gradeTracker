import { List } from "immutable";
import { AnalysisCourse } from "../../models/AnalysisCourse";
import { DataGridColumnDefinition } from "../../views/controls/data-grid/models/DataGridColumnDefinition";
import { defaultFormatter } from "../../views/controls/data-grid/models/Formatters";

export const analysisColumns = List([
    new DataGridColumnDefinition<AnalysisCourse>(
        defaultFormatter((c) => c.title),
        "Course Title",
        300,
    ),
    new DataGridColumnDefinition<AnalysisCourse>(
        defaultFormatter((c) => c.creditHours),
        "Credit Hours",
        150,
    ),
    new DataGridColumnDefinition<AnalysisCourse>(
        defaultFormatter((c) => c.currentGPA),
        "Curr. GPA",
        100,
    ),
    new DataGridColumnDefinition<AnalysisCourse>(
        defaultFormatter((c) => c.guarenteedGPA),
        "Guar. GPA",
        100,
    ),
    new DataGridColumnDefinition<AnalysisCourse>(
        defaultFormatter((c) => c.potentialGPA),
        "Potn. GPA",
        100,
    ),
]);
