import React, {  } from "react";
import styled from "styled-components";

interface Props {
    headerText?: string;
}

const ListHeader = (props: Props) => (
    <Container id="list-header">
        <span>{props.headerText}</span>
    </Container>
);

const Container = styled.div`
    font-size: 20px;
    padding: 10px;
    border-bottom: solid black 1px;
`;

export default ListHeader;
