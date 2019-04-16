import React, { MouseEvent, ReactNode } from "react";
import styled from "styled-components";

export interface BodyCellProps {
    className?: string;
    height: number;
    width: number;
    content?: string | ReactNode;
    columnIndex?: number;
    onCellClick: (event: MouseEvent<HTMLDivElement>, props: BodyCellProps) => void;
}

const BodyCell = (props: BodyCellProps) => {
    const handleCellClick = (event: MouseEvent<HTMLDivElement>) => {
        props.onCellClick(event, props);
    };

    return (
        <div
            id="body-cell"
            className={props.className}
            onClick={handleCellClick}
        >
            {props.content}
        </div>
    );
};

export default styled(BodyCell)`
    display: flex;
    flex: 1;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;
