import React, {  } from "react";
import styled from "styled-components";

interface Props {
    grade?: number;
}

const ColoredCell = (props: Props) => (
    <Container grade={props.grade}>
        {props.grade?.toFixed(2)}
    </Container>
);

const Container = styled.span<Props>`
    width: 100%;
    line-height: 30px;
    text-align: center;
    color: black;
    background: ${props => {
        const grade = props.grade || 0;
        if (grade >= 90) {
            return "#409C40";
        } else if (grade >= 80) {
            return "#FFFF76";
        } else if (grade >= 60) {
            return "#de8054";
        } else if (grade !== 0) {
            return "#de5454";
        } else {
            return "none";
        }
    }};
`;

export default ColoredCell;
