import * as React from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    headerText?: string;
}

class ListHeader extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
            headerText,
        } = this.props;

        return (
            <div className={className}>
                <span>{headerText}</span>
            </div>
        );
    }
}

export default styled(ListHeader)`
    font-size: 20px;
    color: ${(props) => props.theme.primaryText};
    padding: 10px;
    border-bottom: solid ${(props) => props.theme.primaryText} 1px;
    background: ${(props) => props.theme.white};
`;
