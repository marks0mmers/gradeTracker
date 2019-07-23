import styled from "styled-components";

interface Props {
    width?: number;
    height?: number;
    isInvalid?: boolean;
    gridArea?: string;
    marginRight?: number;
    marginTop?: number;
    marginLeft?: number;
    marginBottom?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingLeft?: number;
    paddingBottom?: number;

}

export default styled.input<Props>`
    height: ${props => props.height || 20}px;
    font-size: ${props => (props.height || 20) * 0.75}px;
    width: ${props => props.width ? `${props.width}px` : `100%`};
    border-radius: 3px;
    border: solid ${props => props.isInvalid ? "red" : "#eeeeee"} 1px;
    grid-area: ${props => props.gridArea};

    margin-right: ${props => props.marginRight ? `${props.marginRight}px` : "0px"};
    margin-top: ${props => props.marginTop ? `${props.marginTop}px` : "0px"};
    margin-left: ${props => props.marginLeft ? `${props.marginLeft}px` : "0px"};
    margin-bottom: ${props => props.marginBottom ? `${props.marginBottom}px` : "0px"};

    padding-right: ${props => props.paddingRight ? `${props.paddingRight}px` : "0px"};
    padding-top: ${props => props.paddingTop ? `${props.paddingTop}px` : "0px"};
    padding-left: ${props => props.paddingLeft ? `${props.paddingLeft}px` : "0px"};
    padding-bottom: ${props => props.paddingBottom ? `${props.paddingBottom}px` : "0px"};

    ::placeholder {
        font-size: 12px;
        margin: auto;
    }
`;
