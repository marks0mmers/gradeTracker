export class DataGridElement<T> {
    public payload: T;
    public isSelected?: boolean;
    public isBottom?: boolean;

    public constructor(payload: T, isSelected?: boolean, isBottom?: boolean) {
        this.payload = payload;
        this.isBottom = isBottom;
        this.isSelected = isSelected;
    }
}
