import { List } from "immutable";
import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";
import { DataGridColumnDefinition } from "../models/DataGridColumnDefinition";
import { DataGridElement } from "../models/DataGridElement";
import BodyCell, { BodyCellProps } from "./BodyCell";

interface Props {
    className?: string;
    element: DataGridElement;
    columnDefinitions: List<DataGridColumnDefinition> | undefined;
    height: number;
// tslint:disable-next-line: no-any
    onBodyCellClick?: (event: MouseEvent<HTMLDivElement>, payload: any, props: BodyCellProps) => void;
}

const ElementRow = (props: Props) => {

    const { onBodyCellClick } = props;

    const handleCellClick = useCallback((event: MouseEvent<HTMLDivElement>, bodyProps: BodyCellProps) => {
        const handler = onBodyCellClick;
        if (handler) {
            handler(event, props.element.payload, bodyProps);
        }
    }, [onBodyCellClick, props.element]);

    return (
        <div id="element-row" className={props.className}>
            {props.columnDefinitions && props.columnDefinitions.map((
                column: DataGridColumnDefinition, idx: number,
            ) => {
                const { payload } = props.element;
                const content = column.field && payload && payload[column.field];
                return (
                        <BodyCell
                            key={idx}
                            width={column.width || 200}
                            height={props.height}
                            content={content}
                            type={column.type}
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
