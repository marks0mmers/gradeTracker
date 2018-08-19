import { List } from "immutable";
import * as React from "react";
import styled from "styled-components";
import { DataGridColumnDefinition } from "../models/DataGridColumnDefinition";
import { DataGridElement } from "../models/DataGridElement";
import BodyCell, { BodyCellProps } from "./BodyCell";

interface Props<T> {
    className?: string;
    element: DataGridElement<T>;
    columnDefinitions: List<DataGridColumnDefinition<T>> | undefined;
    height: number;
    onBodyCellClick?: (event: React.MouseEvent<HTMLDivElement>, payload: T, props: BodyCellProps) => void;
}

class ElementRow<T> extends React.Component<Props<T>> {

    constructor(props: Props<T>) {
        super(props);
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    public render() {
        const {
            className,
            columnDefinitions,
            element,
            height,
        } = this.props;
        return (
        <div id="element-row" className={className}>
            {columnDefinitions && columnDefinitions.map((column: DataGridColumnDefinition<T>, idx: number) => {
                const object = element.payload;
                const content = column.formatter && object && column.formatter(object);
                return (
                        <BodyCell
                            key={idx}
                            width={column.width || 200}
                            height={height}
                            content={content}
                            onCellClick={this.handleCellClick}
                        />
                    );
                })
            }
        </div>);
    }

    private handleCellClick(event: React.MouseEvent<HTMLDivElement>, props: BodyCellProps) {
        const handler = this.props.onBodyCellClick;
        if (handler) {
            handler(event, this.props.element.payload, props);
        }
    }
}

export default styled(ElementRow)`
    display: flex;
    flex-direction: row;
    background: ${(props) => props.element.isSelected ? props.theme.quinary : props.theme.hover};
    color: ${(props) => props.element.isSelected ? props.theme.primaryText : props.theme.primaryText};
    border-top: ${(props) => props.element.isBottom ? `solid ${props.theme.primaryText} 1px` : "none"};
`;
