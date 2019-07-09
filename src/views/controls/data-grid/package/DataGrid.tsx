import { List } from "immutable";
import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";
import { BodyCellProps } from "../components/BodyCell";
import ElementRow from "../components/ElementRow";
import HeaderCell from "../components/HeaderCell";
import { DataGridColumnDefinition } from "../models/DataGridColumnDefinition";
import { DataGridElement } from "../models/DataGridElement";

interface Props {
    className?: string;
    id: string;
    rowHeight?: number;
    columnDefinitions?: List<DataGridColumnDefinition>;
    elements?: List<DataGridElement>;
    gridArea?: string;
// tslint:disable-next-line: no-any
    onBodyCellClick?: (event: MouseEvent<HTMLDivElement>, payload: any, props: BodyCellProps) => void;
}

const DataGrid = (props: Props) => {

    const renderHeaderCells = useCallback(() => props.columnDefinitions && props.columnDefinitions.map((
        column: DataGridColumnDefinition,
        idx: number,
    ) => {
        return (
            <HeaderCell
                key={idx}
                height={props.rowHeight || 30}
                width={column.width || 200}
                content={column.label || ""}
                columnIndex={idx}
            />
        );
    }).toList(), [props.columnDefinitions, props.rowHeight]);

    const renderBodyCells = useCallback(
        () => props.elements && props.elements.map((element: DataGridElement, idx: number) => (
            <ElementRow
                key={idx}
                element={element}
                columnDefinitions={props.columnDefinitions}
                height={props.rowHeight || 30}
                onBodyCellClick={props.onBodyCellClick}
            />
        )),
        [props.columnDefinitions, props.elements, props.onBodyCellClick, props.rowHeight],
    );

    return (
        <div className={props.className}>
            <div className="header-cells">
                {renderHeaderCells()}
            </div>
            {renderBodyCells()}
        </div>
    );
};

export default styled(DataGrid)`
    grid-area: ${(props) => props.gridArea ? props.gridArea : ""};
    display: flex;
    flex-direction: column;

    .header-cells {
        display: flex;
        flex-direction: row;
    }

`;
