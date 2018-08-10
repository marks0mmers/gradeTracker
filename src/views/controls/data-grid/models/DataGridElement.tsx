import { Record } from "immutable";

const DataGridElementRecord = Record({
    isBottom: false,
    isSelected: false,
    payload: {},
});

export class DataGridElement<T> extends DataGridElementRecord {
    public payload: T;
    public isSelected?: boolean;
    public isBottom?: boolean;
}
