import * as React from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    iconName?: string;
    size?: number;
    margin?: number;
}

class Icon extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
            iconName,
        } = this.props;

        return (
            <i id="icon" className={`${className} material-icons`}>{iconName}</i>
        );
    }
}

export default styled(Icon)`
    margin: ${(props) => props.margin ? `${props.margin}px` : `auto`};
    font-size: ${(props) => props.size}px;
`;
