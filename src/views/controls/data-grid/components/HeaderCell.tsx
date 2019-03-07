import React, {  } from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    height: number;
    width: number;
    content: string;
    columnIndex?: number;
}

const HeaderCell = (props: Props) => (
    <div className={props.className}>
        <span className="header-label">{props.content}</span>
    </div>
);

export default styled(HeaderCell)`
    display: flex;
    flex: 1;
    background: ${(props) => props.theme.quaternary};
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-bottom: solid ${(props) => props.theme.black} 1px;

    .header-label {
        margin: auto;
        line-height: ${(props) => props.height}px;
        color: ${(props) => props.theme.black};
        font-size: 1.1vw;
    }
`;
