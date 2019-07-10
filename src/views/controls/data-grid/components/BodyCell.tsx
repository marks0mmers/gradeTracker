import React, { MouseEvent, useCallback } from "react";
import styled from "styled-components";
import ColoredCell from "./ColoredCell";

export interface BodyCellProps {
    height: number;
    width: number;
    content: string;
    type?: "normal" | "colored";
    columnIndex?: number;
    onCellClick: (event: MouseEvent<HTMLDivElement>, props: BodyCellProps) => void;
}

const BodyCell = (props: BodyCellProps) => {

    //#region Prop Destructure
    const { onCellClick } = props;
    //#endregion

    //#region Private Methods
    const handleCellClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        onCellClick(event, props);
    }, [onCellClick, props]);
    //#endregion

    //#region Render Method
    return (
        <Container
            id="body-cell"
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
        </Container>
    );
    //#endregion
};

//#region Styles
const StyledSpan = styled.span`
    width: 100%;
    text-align: center;
    line-height: 30px;
`;

const Container = styled.div<Partial<BodyCellProps>>`
    display: flex;
    flex: 1;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;
//#endregion

export default BodyCell;
