import * as React from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";

interface Props {
    className?: string;
    id?: string;
    text?: string;
    tooltip?: string;
    icon?: string;
    width?: number;
    height?: number;
    marginTopBottom?: number;
    marginLeftRight?: number;
    gridArea?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

class Button extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
            text,
            icon,
            onClick,
            id,
            tooltip,
        } = this.props;

        return (
            <button
                id={id}
                className={className}
                onClick={onClick}
                title={tooltip}
            >
                {icon && <Icon iconName={icon} margin={5}/>}
                {text}
            </button>
        );
    }
}

export default styled(Button)`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    margin: ${(props) => props.marginTopBottom || 0}px ${(props) => props.marginLeftRight || 0}px;
    background: ${(props) => props.theme.white};
    border: none;
    color: ${(props) => props.theme.primaryText};
    grid-area: ${(props) => props.gridArea};
    :hover {
        background: ${(props) => props.theme.hover};
    }
`;
