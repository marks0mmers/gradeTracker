import { Record } from "immutable";

const DataGridColumnDefinitionRecord = Record({
    formatter: undefined,
    label: undefined,
    width: 150,
});

export class DataGridColumnDefinition<T> extends DataGridColumnDefinitionRecord {
    public formatter?: (payload: T) => string | JSX.Element;
    public label?: string;
    public width?: number;
}
