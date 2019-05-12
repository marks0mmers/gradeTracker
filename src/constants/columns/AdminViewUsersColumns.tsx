import { List } from "immutable";
import { UserGridView } from "../../models/User";
import { DataGridColumnDefinition } from "../../views/controls/data-grid/models/DataGridColumnDefinition";
import { defaultFormatter } from "../../views/controls/data-grid/util/Formatters";

export const adminViewUsersColumns = List<DataGridColumnDefinition<UserGridView>>([
    new DataGridColumnDefinition<UserGridView>({
        formatter: defaultFormatter((user: UserGridView) => user.firstName),
        label: "First Name",
        width: 100,
    }),
    new DataGridColumnDefinition<UserGridView>({
        formatter: defaultFormatter((user: UserGridView) => user.lastName),
        label: "Last Name",
        width: 100,
    }),
    new DataGridColumnDefinition<UserGridView>({
        formatter: defaultFormatter((user: UserGridView) => user.email),
        label: "Email",
        width: 100,
    }),
]);
