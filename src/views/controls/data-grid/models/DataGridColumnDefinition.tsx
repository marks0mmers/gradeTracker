import { Record } from "immutable";
import { ReactNode } from "react";

const DataGridColumnDefinitionRecord = Record({
    formatter: undefined,
    label: undefined,
    width: 150,
});

export class DataGridColumnDefinition<T> extends DataGridColumnDefinitionRecord {
    public formatter?: (payload: T) => string | ReactNode;
    public label?: string;
    public width?: number;
}
