import * as React from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    content?: JSX.Element;
}

class ListFooter extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
            content,
        } = this.props;

        return (
            <div className={className}>
                {content}
            </div>
        );
    }
}

export default styled(ListFooter)`
    display: flex;
    justify-content: flex-end;
    color: ${(props) => props.theme.primaryText};
    border-bottom: solid ${(props) => props.theme.primaryText} 1px;
    background: ${(props) => props.theme.white};
    min-height: fit-content;
`;
