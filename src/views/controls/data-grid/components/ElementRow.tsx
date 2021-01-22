import { List } from "immutable";
import { MouseEvent, useCallback } from "react";
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

export function ElementRow<T>({onBodyCellClick, ...props}: Props<T>) {

    const handleCellClick = useCallback((event: MouseEvent<HTMLDivElement>, bodyProps: BodyCellProps) => {
        if (onBodyCellClick) {
            onBodyCellClick(event, props.element.payload, bodyProps);
        }
    }, [onBodyCellClick, props.element]);

    return (
        <Container id="element-row" {...props}>
            {props.columnDefinitions?.map((column, idx) => {
                const { payload } = props.element;
                const content = column.formatter(payload);
                return (
                    <BodyCell
                        key={idx}
                        width={column.width ?? 200}
                        height={props.height}
                        content={content}
                        onCellClick={handleCellClick}
                    />
                );
            })}
        </Container>
    );
}

const Container = styled.div<{element: {isSelected?: boolean;  isBottom?: boolean}}>`
    display: flex;
    flex-direction: row;
    background: ${props => props.element.isSelected ? "#79c8ec" : "#eeeeee"};
    border-top: ${props => props.element.isBottom ? "solid black 1px" : "none"};
`;
