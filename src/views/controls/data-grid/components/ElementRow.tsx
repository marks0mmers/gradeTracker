import { List } from "immutable";
import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";
import { DataGridColumnDefinition } from "../models/DataGridColumnDefinition";
import { DataGridElement } from "../models/DataGridElement";
import BodyCell, { BodyCellProps } from "./BodyCell";

interface Props<T> {
    element: DataGridElement<T>;
    columnDefinitions: List<DataGridColumnDefinition<T>> | undefined;
    height: number;
    onBodyCellClick?: (event: MouseEvent<HTMLDivElement>, payload: T, props: BodyCellProps) => void;
}

function ElementRow<T>(props: Props<T>) {

    //#region Prop Destructure
    const {onBodyCellClick} = props;
    //#endregion

    //#region Private Methods
    const handleCellClick = useCallback((event: MouseEvent<HTMLDivElement>, bodyProps: BodyCellProps) => {
        const handler = onBodyCellClick;
        if (handler) {
            handler(event, props.element.payload, bodyProps);
        }
    }, [onBodyCellClick, props.element]);
    //#endregion

    //#region Render Method
    return (
        <Container id="element-row" {...props}>
            {props.columnDefinitions && props.columnDefinitions.map((
                column: DataGridColumnDefinition<T>, idx: number,
            ) => {
                const { payload } = props.element;
                const content = column.formatter && column.formatter(payload);
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
        </Container>
    );
    //#endregion
}

//#region Styles
const Container = styled.div<{element: {isSelected?: boolean;  isBottom?: boolean}}>`
    display: flex;
    flex-direction: row;
    background: ${props => props.element.isSelected ? "#79c8ec" : "#eeeeee"};
    border-top: ${props => props.element.isBottom ? "solid black 1px" : "none"};
`;
//#endregion

export default ElementRow;
