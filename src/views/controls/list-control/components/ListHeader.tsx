import React, {  } from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    headerText?: string;
}

const ListHeader = (props: Props) => (
    <div className={props.className}>
        <span>{props.headerText}</span>
    </div>
);

export default styled(ListHeader)`
    font-size: 20px;
    color: ${(props) => props.theme.primaryText};
    padding: 10px;
    border-bottom: solid ${(props) => props.theme.primaryText} 1px;
    background: ${(props) => props.theme.white};
`;
