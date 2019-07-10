import React from "react";
import styled from "styled-components";
import ColoredCell from "../components/ColoredCell";

const StyledSpan = styled.span`
    width: 100%;
    text-align: center;
    line-height: 30px;
`;

export const defaultFormatter = <T extends {}>(getter: (data: T) => string | number | undefined) => (payload: T) => {
    const element = getter(payload);
    return (<StyledSpan>{element}</StyledSpan>);
};

export const gradeFormatter = <T extends {}>(getter: (data: T) => number) => (payload: T) => {
    const element = getter(payload);
    return (<ColoredCell grade={element} />);
};
