import { Record, RecordOf } from "immutable";

interface IDataGridColumnDefinition {
    field?: string;
    label?: string;
    width?: number;
}

export const DataGridColumnDefinition = Record<IDataGridColumnDefinition>({
    field: undefined,
    label: undefined,
    width: 150,
});

export type DataGridColumnDefinition = RecordOf<IDataGridColumnDefinition>;
