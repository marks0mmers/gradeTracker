import { List } from "immutable";
import { User } from "models/User";
import { DataGridColumnDefinition } from "../../views/controls/data-grid/models/DataGridColumnDefinition";
import { defaultFormatter } from "../../views/controls/data-grid/models/Formatters";

export const adminViewUsersColumns = List<DataGridColumnDefinition<User>>([
    new DataGridColumnDefinition<User>(
        defaultFormatter((u) => u.firstName),
        "First Name",
        100,
    ),
    new DataGridColumnDefinition<User>(
        defaultFormatter((u) => u.lastName),
        "Last Name",
        100,
    ),
    new DataGridColumnDefinition<User>(
        defaultFormatter((u) => u.email),
        "Email",
        100,
    ),
]);
