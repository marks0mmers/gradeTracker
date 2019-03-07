import React, { MouseEvent } from "react";
import styled from "styled-components";
import Icon from "../../components/Icon";

interface Props {
    className?: string;
    id?: string;
    text?: string;
    tooltip?: string;
    icon?: string;
    width?: number;
    height?: number;
    marginTopBottom?: number;
    marginLeftRight?: number;
    gridArea?: string;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Props) => (
    <button
        id={props.id}
        className={props.className}
        onClick={props.onClick}
        title={props.tooltip}
    >
        {props.icon && <Icon iconName={props.icon} margin={5}/>}
        {props.text}
    </button>
);

export default styled(Button)`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    margin: ${(props) => props.marginTopBottom || 0}px ${(props) => props.marginLeftRight || 0}px;
    background: ${(props) => props.theme.white};
    border: none;
    color: ${(props) => props.theme.primaryText};
    grid-area: ${(props) => props.gridArea};
    :hover {
        background: ${(props) => props.theme.hover};
    }
`;
