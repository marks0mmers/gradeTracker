import { List } from "immutable";
import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";
import { BodyCellProps } from "../components/BodyCell";
import { ElementRow } from "../components/ElementRow";
import HeaderCell from "../components/HeaderCell";
import { DataGridColumnDefinition } from "../models/DataGridColumnDefinition";
import { DataGridElement } from "../models/DataGridElement";

interface Props<T> {
    id: string;
    rowHeight?: number;
    columnDefinitions?: List<DataGridColumnDefinition<T>>;
    elements?: List<DataGridElement<T>>;
    gridArea?: string;
    onBodyCellClick?: (event: MouseEvent<HTMLDivElement>, payload: T, props: BodyCellProps) => void;
}

function DataGrid<T>(props: Props<T>) {

    //#region Display Methods
    const renderHeaderCells = useCallback(() => props.columnDefinitions?.map((column, idx) => (
        <HeaderCell
            key={idx}
            height={props.rowHeight ?? 30}
            width={column.width ?? 200}
            content={column.label ?? ""}
        />
    )), [props.columnDefinitions, props.rowHeight]);

    const renderBodyCells = useCallback(() => props.elements?.map((element, idx) => (
        <ElementRow
            key={idx}
            element={element}
            columnDefinitions={props.columnDefinitions}
            height={props.rowHeight || 30}
            onBodyCellClick={props.onBodyCellClick}
        />
    )), [props.columnDefinitions, props.elements, props.onBodyCellClick, props.rowHeight]);
    //#endregion

    //#region Render Method
    return (
        <Container id="data-grid" gridArea={props.gridArea}>
            <HeaderCells id="header-cells">
                {renderHeaderCells()}
            </HeaderCells>
            {renderBodyCells()}
        </Container>
    );
    //#endregion
}

//#region Styles
const HeaderCells = styled.div`
    display: flex;
    flex-direction: row;
`;

const Container = styled.div<{gridArea?: string}>`
    grid-area: ${props => props.gridArea ? props.gridArea : ""};
    display: flex;
    flex-direction: column;
`;
//#endregion

export default DataGrid;
