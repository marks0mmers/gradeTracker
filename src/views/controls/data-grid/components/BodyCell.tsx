import React, { MouseEvent, ReactNode, useCallback } from "react";
import styled from "styled-components";

export interface BodyCellProps {
    height: number;
    width: number;
    content: ReactNode;
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
            {props.content}
        </Container>
    );
    //#endregion
};

//#region Styles
const Container = styled.div<Partial<BodyCellProps>>`
    display: flex;
    flex: 1;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;
//#endregion

export default BodyCell;
