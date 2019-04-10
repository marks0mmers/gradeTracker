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
    border-bottom: solid black 1px;
    min-height: fit-content;
`;
