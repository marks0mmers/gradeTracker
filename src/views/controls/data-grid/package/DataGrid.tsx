import { List } from "immutable";
import React, { Component, MouseEvent } from "react";
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

class DataGrid<T> extends Component<Props<T>> {

    public render() {
        const {
            className,
        } = this.props;

        return (
            <div className={className}>
                <div className="header-cells">
                    {this.renderHeaderCells()}
                </div>
                {this.renderBodyCells()}
            </div>
        );
    }

    private renderHeaderCells = () => {
        const {
            columnDefinitions,
            rowHeight,
        } = this.props;

        return columnDefinitions && columnDefinitions.map((column: DataGridColumnDefinition<T>, idx: number) => {
            return (
                <HeaderCell
                    key={idx}
                    height={rowHeight || 30}
                    width={column.width || 200}
                    content={column.label || ""}
                    columnIndex={idx}
                />
            );
        }).toList();
    }

    private renderBodyCells = () => {
        const {
            columnDefinitions,
            elements,
            rowHeight,
        } = this.props;
        return elements && elements.map((element: DataGridElement<T>, idx: number) => {
            return (
                <ElementRow
                    key={idx}
                    element={element}
                    columnDefinitions={columnDefinitions}
                    height={rowHeight || 30}
                    onBodyCellClick={this.props.onBodyCellClick}
                />
            );
        });
    }
}

export default styled(DataGrid)`
    grid-area: ${(props) => props.gridArea ? props.gridArea : ""};
    display: flex;
    flex-direction: column;

    .header-cells {
        display: flex;
        flex-direction: row;
    }

`;
