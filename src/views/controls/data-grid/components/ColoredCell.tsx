import React, {  } from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    grade?: number;
}

const ColoredCell = (props: Props) => (
    <span className={props.className}>
        {props.grade}
    </span>
);

export default styled(ColoredCell)`
    width: 100%;
    line-height: 30px;
    text-align: center;
    color: black;
    background: ${(props) => {
        const grade = props.grade || 0;
        if (grade >= 90) {
            return "#409C40";
        } else if (grade >= 80) {
            return "#FFFF76";
        } else if (grade >= 70) {
            return "#de8054";
        } else {
            return "#de5454";
        }
    }};
`;
