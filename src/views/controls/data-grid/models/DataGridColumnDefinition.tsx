import { ReactNode } from "react";

type Formatter<T> = (payload: T) => ReactNode;

export class DataGridColumnDefinition<T> {
    public formatter: Formatter<T>;
    public label: string;
    public width?: number;

    constructor(formatter: Formatter<T>, label: string, width?: number) {
        this.formatter = formatter;
        this.label = label;
        this.width = width;
    }
}
