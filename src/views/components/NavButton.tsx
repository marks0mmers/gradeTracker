import * as React from "react";
import styled from "styled-components";
import Icon from "./Icon";

interface Props {
    id?: string;
    className?: string;
    iconName: string;
    activeButton?: string;

    onClick?: (id: string) => void;
}

class NavButton extends React.Component<Props> {

    constructor(props: Props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        const {
            className,
            id,
            iconName,
        } = this.props;

        return (
            <div id={id} className={className} onClick={this.handleClick}>
                <Icon
                    iconName={iconName}
                    size={50}
                    margin={5}
                />
            </div>
        );
    }

    private handleClick() {
        const handler = this.props.onClick;
        const { id } = this.props;
        if (handler && id) {
            handler(id);
        }
    }
}

export default styled(NavButton)`
    color: ${(props) => props.theme.secondaryText};
    :hover {
        background: ${(props) => props.theme.secondaryHover};
        cursor: pointer;
    }
    background: ${(props) => props.id === props.activeButton ? props.theme.secondaryActive : props.theme.secondary};
`;
