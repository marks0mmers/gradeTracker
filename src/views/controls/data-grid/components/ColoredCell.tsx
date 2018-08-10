import * as React from "react";
import styled from "styled-components";

interface Props {
    className?: string;
    grade?: number;
}

class ColoredCell extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render() {
        const {
            className,
        } = this.props;

        return (
            <span className={className}>
                {this.props.grade}
            </span>
        );
    }
}

export default styled(ColoredCell)`
    width: 100%;
    height: 100%;
    text-align: center;
    background: ${(props) => {
        const grade = props.grade || 0;
        switch (true) {
            case (grade >= 90):
                return "#409C40";
            case (grade >= 80):
                return "#FFFF76";
            case (grade >= 70):
                return "#de8054";
            case (grade >= 60):
            default:
                return "#de5454";
        }
    }}
`;
