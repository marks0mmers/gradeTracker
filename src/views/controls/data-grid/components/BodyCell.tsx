import * as React from "react";
import styled from "styled-components";

export interface BodyCellProps {
    className?: string;
    height: number;
    width: number;
    content?: string | JSX.Element;
    columnIndex?: number;
    onCellClick?: (event: React.MouseEvent<HTMLDivElement>, props: BodyCellProps) => void;
}

class BodyCell extends React.Component<BodyCellProps> {

    constructor(props: BodyCellProps) {
        super(props);
        this.handleCellClick = this.handleCellClick.bind(this);
    }

    public render() {
        const {
            className,
            content,
        } = this.props;

        return (
            <div
                id="body-cell"
                className={className}
                onClick={this.handleCellClick}
            >
                {content}
            </div>
        );
    }

    private handleCellClick(event: React.MouseEvent<HTMLDivElement>) {
        const handler = this.props.onCellClick;
        if (handler) {
            handler(event, this.props);
        }
    }
}

export default styled(BodyCell)`
    display: flex;
    flex: 1;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;
