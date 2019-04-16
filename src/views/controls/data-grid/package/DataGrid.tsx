import { List } from "immutable";
import React, { MouseEvent } from "react";
import styled from "styled-components";
import { BodyCellProps } from "../components/BodyCell";
import ElementRow from "../components/ElementRow";
import HeaderCell from "../components/HeaderCell";
import { DataGridColumnDefinition } from "../models/DataGridColumnDefinition";
import { DataGridElement } from "../models/DataGridElement";

interface Props<T> {
    className?: string;
    id: string;
    rowHeight?: number;
    columnDefinitions?: List<DataGridColumnDefinition<T>>;
    elements?: List<DataGridElement<T>>;
    gridArea?: string;
    onBodyCellClick?: (event: MouseEvent<HTMLDivElement>, payload: T, props: BodyCellProps) => void;
}

const DataGrid = <T extends {}>(props: Props<T>) => {

    const renderHeaderCells = () => props.columnDefinitions && props.columnDefinitions.map((
        column: DataGridColumnDefinition<T>,
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
    }).toList();

    const renderBodyCells = () => props.elements && props.elements.map((element: DataGridElement<T>, idx: number) => {
        return (
            <ElementRow
                key={idx}
                element={element}
                columnDefinitions={props.columnDefinitions}
                height={props.rowHeight || 30}
                onBodyCellClick={props.onBodyCellClick}
            />
        );
    });

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
