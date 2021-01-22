import { MouseEvent, ReactNode, useCallback } from "react";
import styled from "styled-components";

export interface BodyCellProps {
    height: number;
    width: number;
    content: ReactNode;
    columnIndex?: number;
    onCellClick: (event: MouseEvent<HTMLDivElement>, props: BodyCellProps) => void;
}

const BodyCell = ({onCellClick, ...props}: BodyCellProps) => {

    const handleCellClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        onCellClick(event, {onCellClick, ...props});
    }, [onCellClick, props]);

    return (
        <Container
            id="body-cell"
            onClick={handleCellClick}
        >
            {props.content}
        </Container>
    );
};

const Container = styled.div<Partial<BodyCellProps>>`
    display: flex;
    flex: 1;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
`;

export default BodyCell;
