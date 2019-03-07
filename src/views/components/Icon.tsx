import React, {  } from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    iconName: string;
    size?: number;
    margin?: number;
}

const Icon = (props: Props) => (
    <i id="icon" className={`${props.className} material-icons`}>{props.iconName}</i>
);

export default styled(Icon)`
    margin: auto ${(props) => props.margin ? `${props.margin}px` : `auto`};
    font-size: ${(props) => props.size}px;
`;
