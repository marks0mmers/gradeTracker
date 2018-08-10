import * as React from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    height: number;
    width: number;
    content: string;
    columnIndex?: number;
}

class HeaderCell extends React.Component<Props> {

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
                <span className="header-label">{content}</span>
            </div>
        );
    }
}

export default styled(HeaderCell)`
    display: flex;
    background: ${(props) => props.theme.quaternary}
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-bottom: solid ${(props) => props.theme.black} 1px;

    .header-label {
        margin: auto;
        line-height: ${(props) => props.height}px;
        color: ${(props) => props.theme.black};
        font-size: 1.1vw;
    }
`;
