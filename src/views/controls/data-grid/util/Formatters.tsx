import * as React from "react";
import styled from "styled-components";
import ColoredCell from "../components/ColoredCell";

type Lambda<T> = (value: T) => number | string | boolean | undefined;

const StyledSpan = styled.span`
    width: 100%;
    text-align: center;
    line-height: 30px;
`;

export const defaultFormatter = <T extends {}>(lambda: Lambda<T>) => (payload: T) => {
    const value = lambda(payload);
    return (
        <StyledSpan id="default-cell">
            {value}
        </StyledSpan>
    );
};

export const percentageFormatter = <T extends {}>(lambda: Lambda<T>) => (payload: T) => {
    const value = lambda(payload);
    return (
        <StyledSpan id="default-cell">
            {`${value}%`}
        </StyledSpan>
    );
};

export const gradeFormatter = <T extends {}>(lambda: Lambda<T>) => (payload: T) => {
    const value = lambda(payload) as number;
    return (
        <ColoredCell
            grade={value}
        />
    );
};
