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
    padding: 10px;
    border-bottom: solid black 1px;
`;
