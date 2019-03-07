import React, { ReactNode } from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    content?: ReactNode;
}

const ListFooter = (props: Props) => (
    <div className={props.className}>
        {props.content}
    </div>
);

export default styled(ListFooter)`
    display: flex;
    justify-content: flex-end;
    color: ${(props) => props.theme.primaryText};
    border-bottom: solid ${(props) => props.theme.primaryText} 1px;
    background: ${(props) => props.theme.white};
    min-height: fit-content;
`;
