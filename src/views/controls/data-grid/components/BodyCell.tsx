import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";
import ColoredCell from "./ColoredCell";

export interface BodyCellProps {
    className?: string;
    height: number;
    width: number;
    content: string;
    type?: "normal" | "colored";
    columnIndex?: number;
    onCellClick: (event: MouseEvent<HTMLDivElement>, props: BodyCellProps) => void;
}

const BodyCell = (props: BodyCellProps) => {

    const handleCellClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        props.onCellClick(event, props);
    }, [props]);

    return (
        <div
            id="body-cell"
            className={props.className}
            onClick={handleCellClick}
        >
            {
                props.type === "normal" &&
                <StyledSpan>
                    {props.content}
                </StyledSpan>
            }
            {
                props.type === "colored" && !isNaN(+props.content) &&
                <ColoredCell grade={+props.content} />
            }
        </div>
    );
};

const StyledSpan = styled.span`
    width: 100%;
    text-align: center;
    line-height: 30px;
`;

export default styled(BodyCell)`
    display: flex;
    flex: 1;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;
