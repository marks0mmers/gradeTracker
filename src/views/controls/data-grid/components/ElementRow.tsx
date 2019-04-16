import { List } from "immutable";
import React, { MouseEvent } from "react";
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

const ElementRow = <T extends {}>(props: Props<T>) => {

    const handleCellClick = (event: MouseEvent<HTMLDivElement>, bodyProps: BodyCellProps) => {
        const handler = props.onBodyCellClick;
        if (handler) {
            handler(event, props.element.payload, bodyProps);
        }
    };

    return (
        <div id="element-row" className={props.className}>
            {props.columnDefinitions && props.columnDefinitions.map((
                column: DataGridColumnDefinition<T>, idx: number,
            ) => {
                const { payload } = props.element;
                const content = column.formatter && payload && column.formatter(payload);
                return (
                        <BodyCell
                            key={idx}
                            width={column.width || 200}
                            height={props.height}
                            content={content}
                            onCellClick={handleCellClick}
                        />
                    );
                })
            }
        </div>
    );
};

export default styled(ElementRow)`
    display: flex;
    flex-direction: row;
    background: ${(props) => props.element.isSelected ? "#79c8ec" : "#eeeeee"};
    border-top: ${(props) => props.element.isBottom ? "solid black 1px" : "none"};
`;
