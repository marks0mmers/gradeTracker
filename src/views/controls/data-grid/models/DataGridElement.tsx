import { Record, RecordOf } from "immutable";

interface IDataGridElement {
// tslint:disable-next-line: no-any
    payload: any;
    isSelected?: boolean;
    isBottom?: boolean;
}

export const DataGridElement = Record<IDataGridElement>({
    isBottom: false,
    isSelected: false,
    payload: {},
});

export type DataGridElement = RecordOf<IDataGridElement>;
