import { Record, RecordOf } from "immutable";

interface IDataGridColumnDefinition {
    field?: string;
    label?: string;
    width?: number;
    type?: "normal" | "colored";
}

export const DataGridColumnDefinition = Record<IDataGridColumnDefinition>({
    field: undefined,
    label: undefined,
    width: 150,
    type: "normal",
});

export type DataGridColumnDefinition = RecordOf<IDataGridColumnDefinition>;
