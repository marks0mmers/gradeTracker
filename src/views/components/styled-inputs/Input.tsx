import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    name?: string;
    width?: number;
    height?: number;
    placeholder?: string;
    type?: string;
    value?: string;
    isInvalid?: boolean;
    defaultValue?: string;

    gridArea?: string;
    marginRight?: number;
    marginTop?: number;
    marginLeft?: number;
    marginBottom?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingLeft?: number;
    paddingBottom?: number;

    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: Props) => (
    <input
        name={props.name}
        type={props.type || "text"}
        placeholder={props.placeholder}
        className={props.className}
        onChange={props.onChange}
        value={props.value}
        defaultValue={props.defaultValue || ""}
    />
);

export default styled(Input)`
    height: ${(props) => props.height}px;
    font-size: ${(props) => (props.height || 0) * 0.75}px;
    width: ${(props) => props.width ? `${props.width}px` : `100%`};
    background: ${(props) => props.theme.white};
    border-radius: 3px;
    border: solid ${(props) => props.isInvalid ? "red" : props.theme.hover} 1px;
    grid-area: ${(props) => props.gridArea};

    margin-right: ${(props) => props.marginRight ? `${props.marginRight}px` : "0px"};
    margin-top: ${(props) => props.marginTop ? `${props.marginTop}px` : "0px"};
    margin-left: ${(props) => props.marginLeft ? `${props.marginLeft}px` : "0px"};
    margin-bottom: ${(props) => props.marginBottom ? `${props.marginBottom}px` : "0px"};

    padding-right: ${(props) => props.paddingRight ? `${props.paddingRight}px` : "0px"};
    padding-top: ${(props) => props.paddingTop ? `${props.paddingTop}px` : "0px"};
    padding-left: ${(props) => props.paddingLeft ? `${props.paddingLeft}px` : "0px"};
    padding-bottom: ${(props) => props.paddingBottom ? `${props.paddingBottom}px` : "0px"};

    ::placeholder {
        font-size: 12px;
        margin: auto;
    }
`;
