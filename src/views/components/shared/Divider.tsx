import styled, { css } from "styled-components";

interface Props {
    isVertical?: boolean;
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    gridArea?: string;
}

export default styled.hr<Props>`
    ${props => props.isVertical ? css`min-width: 1px` : css`min-height: 1px`};
    grid-area: ${props => props.gridArea};
    background-color: black;
    border: none;
    margin-top: ${props => props.top}px;
    margin-right: ${props => props.right}px;
    margin-bottom: ${props => props.bottom}px;
    margin-left: ${props => props.left}px;
`;
