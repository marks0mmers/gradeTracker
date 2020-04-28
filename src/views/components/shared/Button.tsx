import React, { MouseEvent } from "react";
import styled from "styled-components";
import Icon from "../../components/shared/Icon";

interface Props {
    id?: string;
    text?: string;
    tooltip?: string;
    type?: "button" | "submit" | "reset";
    icon?: string;
    width?: number;
    height?: number;
    marginTopBottom?: number;
    marginLeftRight?: number;
    gridArea?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Props) => (
    <StyledButton
        {...props}
    >
        {props.icon && <Icon iconName={props.icon} margin={5}/>}
        {props.text}
    </StyledButton>
);

const StyledButton = styled.button<Props>`
    background: #bbb;
    height: ${props => props.height}px;
    width: ${props => props.width ? `${props.width}px` : "100%"};
    margin: ${props => props.marginTopBottom ?? 0}px ${(props) => props.marginLeftRight ?? 0}px;
    border: none;
    border-radius: 6px;
    grid-area: ${props => props.gridArea};
    :hover {
        background: #eeeeee;
    }
`;

export default Button;
