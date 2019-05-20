import { List } from "immutable";
import { DataGridColumnDefinition } from "../../views/controls/data-grid/models/DataGridColumnDefinition";

export const adminViewUsersColumns = List<DataGridColumnDefinition>([
    new DataGridColumnDefinition({
        field: "firstName",
        label: "First Name",
        width: 100,
    }),
    new DataGridColumnDefinition({
        field: "lastName",
        label: "Last Name",
        width: 100,
    }),
    new DataGridColumnDefinition({
        field: "email",
        label: "Email",
        width: 100,
    }),
]);
