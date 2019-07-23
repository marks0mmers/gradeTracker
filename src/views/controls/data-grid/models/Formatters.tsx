import React from "react";
import styled from "styled-components";
import ColoredCell from "../components/ColoredCell";

const StyledSpan = styled.span`
    width: 100%;
    text-align: center;
    line-height: 30px;
`;

export function defaultFormatter<T>(getter: (data: T) => string | number | undefined) {
    return (payload: T) => {
        const element = getter(payload);
        return (<StyledSpan>{element}</StyledSpan>);
    };
}

export function gpaFormatter<T>(getter: (data: T) => number ) {
    return (payload: T) => {
        const element = getter(payload);
        return (<StyledSpan>{element.toPrecision(3)}</StyledSpan>);
    };
}

export function gradeFormatter<T>(getter: (data: T) => number) {
    return (payload: T) => {
        const element = getter(payload);
        return (<ColoredCell grade={element} />);
    };
}
