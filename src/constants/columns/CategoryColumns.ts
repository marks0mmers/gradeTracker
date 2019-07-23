import { List } from "immutable";
import { GradeCategory } from "../../models/GradeCategory";
import { DataGridColumnDefinition } from "../../views/controls/data-grid/models/DataGridColumnDefinition";
import { defaultFormatter, gradeFormatter } from "../../views/controls/data-grid/models/Formatters";

export const categoryColumns: List<DataGridColumnDefinition<GradeCategory>> = List([
    new DataGridColumnDefinition<GradeCategory>(
        defaultFormatter(g => g.title),
        "Category Name",
        300,
    ),
    new DataGridColumnDefinition<GradeCategory>(
        defaultFormatter(g => g.percentage),
        "Percentage",
        100,
    ),
    new DataGridColumnDefinition<GradeCategory>(
        defaultFormatter(g => g.numberOfGrades),
        "Number of Grades",
        200,
    ),
    new DataGridColumnDefinition<GradeCategory>(
        defaultFormatter(g => g.remainingGrades),
        "Grades Remaining",
        180,
    ),
    new DataGridColumnDefinition<GradeCategory>(
        gradeFormatter(g => g.currentAverage),
        "Current Average",
        200,
    ),
    new DataGridColumnDefinition<GradeCategory>(
        gradeFormatter(g => g.guarenteedAverage),
        "Guarenteed Average",
        200,
    ),
    new DataGridColumnDefinition<GradeCategory>(
        gradeFormatter(g => g.potentialAverage),
        "Potential Average",
        200,
    ),
]);
