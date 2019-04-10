import { List } from "immutable";
import React, { Component, MouseEvent } from "react";
import styled from "styled-components";
import { DataGridColumnDefinition } from "../models/DataGridColumnDefinition";
import { DataGridElement } from "../models/DataGridElement";
import BodyCell, { BodyCellProps } from "./BodyCell";

interface Props<T> {
    className?: string;
    element: DataGridElement<T>;
    columnDefinitions: List<DataGridColumnDefinition<T>> | undefined;
    height: number;
    onBodyCellClick?: (event: MouseEvent<HTMLDivElement>, payload: T, props: BodyCellProps) => void;
}

class ElementRow<T> extends Component<Props<T>> {

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
                    const { payload } = element;
                    const content = column.formatter && payload && column.formatter(payload);
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
            </div>
        );
    }

    private handleCellClick = (event: MouseEvent<HTMLDivElement>, props: BodyCellProps) => {
        const handler = this.props.onBodyCellClick;
        if (handler) {
            handler(event, this.props.element.payload, props);
        }
    }
}

export default styled(ElementRow)`
    display: flex;
    flex-direction: row;
    background: ${(props) => props.element.isSelected ? "#edb5bf" : "#eeeeee"};
    border-top: ${(props) => props.element.isBottom ? "solid black 1px" : "none"};
`;
