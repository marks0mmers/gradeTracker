import React, { Component, MouseEvent, ReactNode } from "react";
import styled from "styled-components";

export interface BodyCellProps {
    className?: string;
    height: number;
    width: number;
    content?: string | ReactNode;
    columnIndex?: number;
    onCellClick: (event: MouseEvent<HTMLDivElement>, props: BodyCellProps) => void;
}

class BodyCell extends Component<BodyCellProps> {

    public render() {
        return (
            <div
                id="body-cell"
                className={this.props.className}
                onClick={this.handleCellClick}
            >
                {this.props.content}
            </div>
        );
    }

    private handleCellClick = (event: MouseEvent<HTMLDivElement>) => {
        this.props.onCellClick(event, this.props);
    }
}

export default styled(BodyCell)`
    display: flex;
    flex: 1;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;
