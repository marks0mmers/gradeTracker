import * as React from "react";
import styled from "styled-components";
import Icon from "../../../components/Icon";

interface Props {
    className?: string;
    text?: string;
    icon?: string;
    size?: number;
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
        } = this.props;

        return (
            <button
                id="button"
                className={className}
                onClick={onClick}
            >
                {icon && <Icon iconName={icon} margin={5}/>}
                {text}
            </button>
        );
    }
}

export default styled(Button)`
    height: ${(props) => props.size}px;
    width: ${(props) => (props.size || 0) + 20}px;
    margin: 0 5px;
    background: ${(props) => props.theme.white};
    border: none;
    color: ${(props) => props.theme.primaryText};
    :hover {
        background: ${(props) => props.theme.hover};
    }
`;
